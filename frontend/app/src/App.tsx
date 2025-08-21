import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AuthPage } from './components/AuthPage'
import { TodoApp } from './components/TodoApp'

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="todo-app">
        <h1>Todo</h1>
        <div>Loading...</div>
      </div>
    )
  }

  return isAuthenticated ? <TodoApp /> : <AuthPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App