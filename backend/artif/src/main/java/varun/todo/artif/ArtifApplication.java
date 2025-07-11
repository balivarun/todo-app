package varun.todo.artif;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import varun.todo.artif.model.Todo;
import varun.todo.artif.repository.TodoRepository;
import varun.todo.artif.service.TodoServices;

import java.util.List;

@SpringBootApplication
@RestController
public class ArtifApplication {

	@Autowired
	TodoRepository todoRepository;

	@GetMapping
	public List<Todo> getAllTodos() {
		return TodoServices.getAllTodos();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
		return TodoServices.getTodoById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Todo createTodo(@RequestBody Todo todo) {
		return TodoServices.createTodo(todo);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todo) {
		Todo updated = todoService.updateTodo(id, todo);
		return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String id) {
		return todoService.deleteTodo(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();

	}
}
