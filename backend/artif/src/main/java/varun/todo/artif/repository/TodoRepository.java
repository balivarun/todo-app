package varun.todo.artif.repository;

import varun.todo.artif.model.Todo;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
//    public interface TodoRepository extends CrudRepository<Todo, Long> {
    // save ,findById findAll, delete are the inbuild function in CrudRepository

}