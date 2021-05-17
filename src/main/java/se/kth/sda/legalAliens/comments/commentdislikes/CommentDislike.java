package se.kth.sda.legalAliens.comments.commentdislikes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class CommentDislike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    private String commentDislike;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Comment dislikedComment;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User commentDislikeOwner;

    public CommentDislike () {
    }

    public CommentDislike(String commentDislike) {
        this.commentDislike = commentDislike;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentDislike() {
        return commentDislike;
    }

    public void setCommentDislike(String commentDislike) {
        this.commentDislike = commentDislike;
    }

    public Comment getDislikedComment() {
        return dislikedComment;
    }

    public void setDislikedComment(Comment dislikedComment) {
        this.dislikedComment = dislikedComment;
    }

    public User getCommentDislikeOwner() {
        return commentDislikeOwner;
    }

    public void setCommentDislikeOwner(User commentDislikeOwner) {
        this.commentDislikeOwner = commentDislikeOwner;
    }


}
