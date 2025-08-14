export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface CreateTodoRequest {
  title: string
  priority?: 'low' | 'medium' | 'high'
}

export interface UpdateTodoRequest {
  title?: string
  completed?: boolean
  priority?: 'low' | 'medium' | 'high'
}

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? `${process.env.VITE_API_URL || 'https://todo-app-production-f9b6.up.railway.app'}/api/todos`
  : 'http://localhost:8081/api/todos'

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  const data = await response.json()
  return data.map((todo: Todo & { createdAt: string; updatedAt: string; priority?: string }) => ({
    ...todo,
    priority: todo.priority || 'medium',
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt)
  }))
}

export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  const data = await response.json()
  return {
    ...data,
    priority: data.priority || 'medium',
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  }
}

export const updateTodo = async (id: string, updates: UpdateTodoRequest): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
  const data = await response.json()
  return {
    ...data,
    priority: data.priority || 'medium',
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}