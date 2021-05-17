package se.kth.sda.legalAliens.comments;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import se.kth.sda.legalAliens.comments.CommentLike.CommentLike;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.postlike.PostLike;

import se.kth.sda.legalAliens.comments.commentdislikes.CommentDislike;

import se.kth.sda.legalAliens.posts.postdislikes.PostDislike;

import se.kth.sda.legalAliens.user.User;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 4000)
    private String body;
    private Date created;
    private Date updated;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Post commentOwner;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User userCommentOwner;


    @OneToMany(mappedBy = "likedComment")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private List<CommentLike> commentLikes;

    @OneToMany(mappedBy = "dislikedComment")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CommentDislike> commentDislikes;


    @PrePersist
    protected void onCreate() {
        created = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    public Comment() {
    }

    public Comment(String body) {
        this.body = body;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Post getCommentOwner() {
        return this.commentOwner;
    }

    public void setCommentOwner(Post commentOwner) {
        this.commentOwner = commentOwner;
    }

    public User getUserCommentOwner() {
        return this.userCommentOwner;
    }

    public void setUserCommentOwner(User userCommentOwner) {
        this.userCommentOwner = userCommentOwner;
    }

    public Date getCreated() {
        return this.created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return this.updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }


    public List<CommentLike> getCommentLikes() {
        return commentLikes;
    }

    public void setCommentLikes(List<CommentLike> commentLikes) {
        this.commentLikes = commentLikes;
    }

    public List<CommentDislike> getCommentDislikes() {
        return commentDislikes;
    }

    public void setCommentDislikes(List<CommentDislike> commentDislikes) {
        this.commentDislikes = commentDislikes;

    }
}