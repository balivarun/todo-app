package varun.todo.artif.service;

import varun.todo.artif.model.Todo;
import varun.todo.artif.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements TodoServices {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(new Date());
        todo.setUpdatedAt(new Date());
        if (todo.getCompleted() == null) {
            todo.setCompleted(false);
        }
        if (todo.getPriority() == null || todo.getPriority().trim().isEmpty()) {
            todo.setPriority("medium");
        }
        return todoRepository.save(todo);
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public List<Todo> getTodosByUserId(String userId) {
        return todoRepository.findByUserId(userId);
    }

    @Override
    public Optional<Todo> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    @Override
    public Todo updateTodo(String id, Todo todo) {
        Optional<Todo> existingTodo = todoRepository.findById(id);
        if (existingTodo.isPresent()) {
            Todo updatedTodo = existingTodo.get();
            if (todo.getTitle() != null) {
                updatedTodo.setTitle(todo.getTitle());
            }
            if (todo.getCompleted() != null) {
                updatedTodo.setCompleted(todo.getCompleted());
            }
            if (todo.getPriority() != null) {
                updatedTodo.setPriority(todo.getPriority());
            }
            updatedTodo.setUpdatedAt(new Date());
            return todoRepository.save(updatedTodo);
        }
        throw new RuntimeException("Todo not found with id: " + id);
    }

    @Override
    public void deleteTodo(String id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Todo not found with id: " + id);
        }
    }

    @Override
    public List<Todo> getCompletedTodos() {
        return todoRepository.findAll().stream()
                .filter(todo -> todo.getCompleted() != null && todo.getCompleted())
                .collect(Collectors.toList());
    }

    @Override
    public List<Todo> getPendingTodos() {
        return todoRepository.findAll().stream()
                .filter(todo -> todo.getCompleted() == null || !todo.getCompleted())
                .collect(Collectors.toList());
    }

    @Override
    public List<Todo> getCompletedTodosByUserId(String userId) {
        return todoRepository.findByUserIdAndCompleted(userId, true);
    }

    @Override
    public List<Todo> getPendingTodosByUserId(String userId) {
        return todoRepository.findByUserIdAndCompleted(userId, false);
    }
}