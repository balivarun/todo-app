package varun.todo.artif.service;

import varun.todo.artif.model.Todo;
import java.util.List;
import java.util.Optional;

public interface TodoServices {
    Todo createTodo(Todo todo);
    List<Todo> getAllTodos();
    List<Todo> getTodosByUserId(String userId);
    Optional<Todo> getTodoById(String id);
    Todo updateTodo(String id, Todo todo);
    void deleteTodo(String id);
    List<Todo> getCompletedTodos();
    List<Todo> getPendingTodos();
    List<Todo> getCompletedTodosByUserId(String userId);
    List<Todo> getPendingTodosByUserId(String userId);
}
