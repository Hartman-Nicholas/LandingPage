package se.kth.sda.legalAliens.posts.postlike;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sun.istack.NotNull;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

import javax.persistence.*;

@Entity
public class PostLike {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    private String postLike;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Post likedPost;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User postLikedOwner;

    public PostLike() {
    }

    public PostLike(String postLike) {
        this.postLike = postLike;
    }


    public String getPostLike() {
        return postLike;
    }
    public void setPostLike(String postLike) {
        this.postLike = postLike;

    }
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getPostLikedOwner () {
        return postLikedOwner;
    }

    public void setPostLikedOwner(User postLikedOwner) {
        this.postLikedOwner = postLikedOwner;
    }

    public Post getLikedPost() {
        return likedPost;
    }

    public void setLikedPost(Post likedPost) {
        this.likedPost = likedPost;
    }

}