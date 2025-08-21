package varun.todo.artif.repository;

import varun.todo.artif.model.Todo;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findByUserId(String userId);
    List<Todo> findByUserIdAndCompleted(String userId, Boolean completed);
}