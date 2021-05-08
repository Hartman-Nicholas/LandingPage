package se.kth.sda.legalAliens.comments.CommentLike;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sun.istack.NotNull;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.user.User;

import javax.persistence.*;

@Entity
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    private String commentLike;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Comment likedComment;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User commentLikedOwner;

    public CommentLike() {
    }

    public CommentLike(String commentLike) {
        this.commentLike = commentLike;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getCommentLike() {
        return commentLike; }

    public void setCommentLike(String commentLike) {
        this.commentLike = commentLike;

    }

    public Comment getLikedComment() {

        return likedComment;
    }

    public void setLikedComment(Comment likedComment) {

        this.likedComment = likedComment;
    }

    public User getCommentLikedOwner () {
        return commentLikedOwner;
    }

    public void setCommentLikedOwner(User commentLikedOwner) {

        this.commentLikedOwner = commentLikedOwner;
    }



}