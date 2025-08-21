package varun.todo.artif.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "todo") // MongoDB collection name
public class Todo {

    @Id
    private String id;  // MongoDB typically uses String or ObjectId as ID

    @Field("title")
    private String title;

    @Field("created_at")
    private Date createdAt;

    @Field("completed")
    private Boolean completed;

    @Field("updated_at")
    private Date updatedAt;

    @Field("priority")
    private String priority = "medium";

    @Field("user_id")
    private String userId;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}