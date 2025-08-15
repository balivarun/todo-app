import { useState, useEffect } from 'react'
import './App.css'
import { fetchTodos, createTodo, updateTodo, deleteTodo as apiDeleteTodo, type Todo } from './api/todoApi'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true)
        setError(null)
        const loadedTodos = await fetchTodos()
        setTodos(loadedTodos)
        localStorage.setItem('todos-backup', JSON.stringify(loadedTodos.map(todo => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString()
        }))))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load todos')
        const backup = localStorage.getItem('todos-backup')
        if (backup) {
          try {
            const backupTodos = JSON.parse(backup).map((todo: Todo & { createdAt: string; updatedAt: string }) => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
              updatedAt: new Date(todo.updatedAt)
            }))
            setTodos(backupTodos)
            setError('Using offline backup - some changes may be lost when reconnected')
          } catch {
            setError('Failed to load todos and backup is corrupted')
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  const addTodo = async () => {
    if (inputValue.trim()) {
      try {
        setActionLoading(true)
        setError(null)
        const newTodo = await createTodo({ title: inputValue, priority })
        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        localStorage.setItem('todos-backup', JSON.stringify(updatedTodos.map(todo => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString()
        }))))
        setInputValue('')
        setPriority('medium')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add todo')
      } finally {
        setActionLoading(false)
      }
    }
  }

  const toggleTodo = async (id: string) => {
    try {
      setActionLoading(true)
      setError(null)
      const todo = todos.find(t => t.id === id)
      if (todo) {
        const updatedTodo = await updateTodo(id, { completed: !todo.completed })
        const updatedTodos = todos.map(t => t.id === id ? updatedTodo : t)
        setTodos(updatedTodos)
        localStorage.setItem('todos-backup', JSON.stringify(updatedTodos.map(todo => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString()
        }))))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    } finally {
      setActionLoading(false)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      setActionLoading(true)
      setError(null)
      await apiDeleteTodo(id)
      const updatedTodos = todos.filter(todo => todo.id !== id)
      setTodos(updatedTodos)
      localStorage.setItem('todos-backup', JSON.stringify(updatedTodos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString()
      }))))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    } finally {
      setActionLoading(false)
    }
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditValue(todo.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveEdit = async (id: string) => {
    if (editValue.trim()) {
      try {
        setActionLoading(true)
        setError(null)
        const updatedTodo = await updateTodo(id, { title: editValue.trim() })
        const updatedTodos = todos.map(t => t.id === id ? updatedTodo : t)
        setTodos(updatedTodos)
        localStorage.setItem('todos-backup', JSON.stringify(updatedTodos.map(todo => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          updatedAt: todo.updatedAt.toISOString()
        }))))
        setEditingId(null)
        setEditValue('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update todo')
      } finally {
        setActionLoading(false)
      }
    }
  }

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed)
    if (completedTodos.length === 0) return

    try {
      setActionLoading(true)
      setError(null)
      await Promise.all(completedTodos.map(todo => apiDeleteTodo(todo.id)))
      const updatedTodos = todos.filter(todo => !todo.completed)
      setTodos(updatedTodos)
      localStorage.setItem('todos-backup', JSON.stringify(updatedTodos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString()
      }))))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear completed todos')
    } finally {
      setActionLoading(false)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const todoStats = {
    total: todos.length,
    pending: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }

  if (loading) {
    return (
      <div className="todo-app">
        <h1>Todo</h1>
        <div>Loading todos...</div>
      </div>
    )
  }

  return (
    <div className="todo-app">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <h1>Todo</h1>

      {error && (
        <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          disabled={actionLoading}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          disabled={actionLoading}
          className="priority-select"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button onClick={addTodo} disabled={actionLoading}>
          {actionLoading ? 'Adding...' : 'Add'}
        </button>
      </div>

      <div className="todo-stats">
        <div className="stat">
          <span className="stat-number">{todoStats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{todoStats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-number">{todoStats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="todo-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
          disabled={actionLoading}
        >
          All ({todoStats.total})
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
          disabled={actionLoading}
        >
          Pending ({todoStats.pending})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
          disabled={actionLoading}
        >
          Completed ({todoStats.completed})
        </button>
      </div>

      {todoStats.completed > 0 && (
        <div className="bulk-actions">
          <button 
            onClick={clearCompleted}
            disabled={actionLoading}
            className="clear-completed-btn"
          >
            {actionLoading ? 'Clearing...' : `Clear ${todoStats.completed} completed`}
          </button>
        </div>
      )}

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No todos {filter !== 'all' ? `in ${filter}` : 'yet'}</p>
            {filter === 'all' && <p>Add one above to get started!</p>}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                disabled={actionLoading || editingId === todo.id}
              />
              {editingId === todo.id ? (
                <div className="edit-todo">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(todo.id)
                      if (e.key === 'Escape') cancelEditing()
                    }}
                    className="edit-input"
                    disabled={actionLoading}
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={() => saveEdit(todo.id)}
                      disabled={actionLoading || !editValue.trim()}
                      className="save-btn"
                    >
                      ✓
                    </button>
                    <button 
                      onClick={cancelEditing}
                      disabled={actionLoading}
                      className="cancel-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <div className={`priority-badge priority-${todo.priority}`}>
                      {todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢'}
                    </div>
                    <span className="todo-text" onDoubleClick={() => startEditing(todo)}>
                      {todo.title}
                    </span>
                  </div>
                  <div className="todo-actions">
                    <button 
                      onClick={() => startEditing(todo)}
                      disabled={actionLoading}
                      className="edit-btn"
                      title="Edit todo"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteTodo(todo.id)} 
                      className="delete-btn"
                      disabled={actionLoading}
                      title="Delete todo"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App