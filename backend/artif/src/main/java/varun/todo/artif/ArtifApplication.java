package varun.todo.artif;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import varun.todo.artif.data.Todo;
import varun.todo.artif.repository.TodoRepository;

import javax.security.auth.login.Configuration;
import java.util.Date;

@SpringBootApplication
@RestController
public class ArtifApplication {

	@Autowired
	TodoRepository todoRepository;

	public static void main(String[] args) {
		SessionFactory factory=null;
		SpringApplication.run(ArtifApplication.class, args);

	}
	@GetMapping("/hello")
	public String hello(@RequestParam(value="name",defaultValue="world") String name) {
		return String.format("hello %s!", name);
	}

	//set todo
	@PostMapping("/")
	public void createTodo(@RequestParam(value = "title") String title) {
		Todo todo = new Todo();
		todo.setTitle(title);
		todo.setCompleted(false);
		todo.setCreated_at(new Date());
		todo.setId(234L);
		todoRepository.save(todo);
	}

	@GetMapping("/")
	public Iterable<Todo> getAllTodo(){
		return todoRepository.findAll();
	}



}


