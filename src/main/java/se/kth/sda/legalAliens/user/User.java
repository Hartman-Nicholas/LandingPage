package se.kth.sda.legalAliens.user;

import org.hibernate.validator.constraints.Length;

import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.groups.Group;
import se.kth.sda.legalAliens.posts.Post;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "account")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Email(message = "Invalid email address! Please provide a valid email address")
    @NotEmpty(message = "Please provide an email address")
    @Column(name = "email", unique = true)
    private String email;

    @Length(min = 5, max = 100, message = "Password length must be between 5-100 characters")
    @Column(name = "password")
    private String password;

    @Length(min = 3, max = 100, message = "Name must be between 3-100 characters")
    @Column(name = "name", unique = true)
    private String name;

    @OneToMany(mappedBy = "userCommentOwner")
    private List<Comment> comments;

    @OneToMany(mappedBy = "postOwner")
    private List<Post> posts;

    @OneToMany(mappedBy = "groupOwner")
    private List<Group> groupsCreated;

    @ManyToMany(mappedBy = "members")
    private List<Group> groupsJoined;

    public User() {
    }

    public User(
            @Email(message = "Invalid email address! Please provide a valid email address") @NotEmpty(message = "Please provide an email address") String email,
            @Length(min = 5, max = 100, message = "Password length most be between 5-100 characters") String password,
            @Length(min = 3, max = 100, message = "Name must be between 3-100 characters") String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    @JsonProperty(value = "user_password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Post> getPosts() {
        return this.posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Group> getGroupsCreated() {
        return this.groupsCreated;
    }

    public void setGroupsCreated(List<Group> groupsCreated) {
        this.groupsCreated = groupsCreated;
    }

    public List<Group> getGroupsJoined() {
        return this.groupsJoined;
    }

    public void setGroupsJoined(List<Group> groupsJoined) {
        this.groupsJoined = groupsJoined;
    }

}
