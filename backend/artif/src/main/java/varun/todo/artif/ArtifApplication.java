package varun.todo.artif;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import varun.todo.artif.model.Todo;
import varun.todo.artif.repository.TodoRepository;

import java.util.Date;

@SpringBootApplication
@RestController
public class ArtifApplication {

	@Autowired
	TodoRepository todoRepository;

	public static void main(String[] args) {
		SpringApplication.run(ArtifApplication.class, args);
	}


	@PostMapping("/")
	public void createTodo(@RequestParam(value = "title") String title) {
		Todo todo = new Todo();
		todo.setTitle(title);
		todo.setCompleted(false);
		todo.setCreatedAt(new Date());
		todo.setUpdatedAt(new Date());
		// Don't set ID — MongoDB will auto-generate it
		todoRepository.save(todo);
	}

	@GetMapping("/")
	public Iterable<Todo> getAllTodos() {
		return todoRepository.findAll();
	}
}