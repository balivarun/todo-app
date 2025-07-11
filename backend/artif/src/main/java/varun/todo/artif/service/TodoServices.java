package varun.todo.artif.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import varun.todo.artif.model.Todo;
import varun.todo.artif.repository.TodoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TodoServices {

    @Autowired
    private static TodoRepository todoRepository;

    public static List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(new Date());
        todo.setUpdatedAt(new Date());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(String id, Todo updatedTodo) {
        return todoRepository.findById(id).map(existing -> {
            existing.setTitle(updatedTodo.getTitle());
            existing.setCompleted(updatedTodo.getCompleted());
            existing.setUpdatedAt(new Date());
            return todoRepository.save(existing);
        }).orElse(null);
    }

    public boolean deleteTodo(String id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
