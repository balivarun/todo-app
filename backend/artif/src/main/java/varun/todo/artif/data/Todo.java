package varun.todo.artif.data;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import java.util.Date;

@Entity
@Table(name = "todo") // Table name
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    private Date created_at;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "updated_at")
    private Date updated_at;


    public Long getId() { return todoId; }
    public void setId(Long id) { this.todoId = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Date getCreated_at() { return created_at; }
    public void setCreated_at(Date created_at) { this.created_at = created_at; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public Date getUpdated_at() { return updated_at; }
    public void setUpdated_at(Date updated_at) { this.updated_at = updated_at; }


    // Constructors, getters, setters
}