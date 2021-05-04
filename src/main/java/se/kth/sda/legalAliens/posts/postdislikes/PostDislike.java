package se.kth.sda.legalAliens.posts.postdislikes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

@Entity
public class PostDislike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    private String postDislike;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Post dislikedPost;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User postDislikeOwner;

    public PostDislike() {
    }

    public PostDislike(String postDislike) {
        this.postDislike = postDislike;
    }

    public String getPostDislike() {
        return postDislike;
    }

    public void setPostDislike(String postDislike) {
        this.postDislike = postDislike;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getPostDislikeOwner() {
        return postDislikeOwner;
    }

    public void setPostDislikeOwner(User postDislikeOwner) {
        this.postDislikeOwner = postDislikeOwner;
    }

    public Post getDislikedPost() {
        return dislikedPost;
    }

    public void setDislikedPost(Post dislikedPost) {
        this.dislikedPost = dislikedPost;
    }
}




