package se.kth.sda.legalAliens.posts.postdislikes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import se.kth.sda.legalAliens.posts.Post;

@Entity
public class PostDislike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    private String postDislikeOwner;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Post postDislike;

    public PostDislike() {
    }

    public PostDislike(String postDislikeOwner, Post postDislike ) {
         this.postDislikeOwner = postDislikeOwner;
         this.postDislike = postDislike;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostDislikeOwner() {
        return postDislikeOwner;
    }

    public void setPostDislikeOwner(String postDislikeOwner) {
        this.postDislikeOwner = postDislikeOwner;
    }

    public Post getPostDislike() {
        return postDislike;
    }

    public void setPostDislike(Post postDislike) {
        this.postDislike = postDislike;
    }
}




