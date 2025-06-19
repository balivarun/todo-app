package varun.todo.artif.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import varun.todo.artif.data.Todo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
//    public interface TodoRepository extends CrudRepository<Todo, Long> {
    // save ,findById findAll, delete are the inbuild function in CrudRepository

}