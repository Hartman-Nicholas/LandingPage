package se.kth.sda.legalAliens.posts;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.groups.Group;

import se.kth.sda.legalAliens.posts.postdislikes.PostDislike;
import se.kth.sda.legalAliens.posts.postlike.PostLike;

import se.kth.sda.legalAliens.user.User;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;
    private Date created;
    private Date updated;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User postOwner;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "title")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Group groupOwner;

    @OneToMany(mappedBy = "commentOwner")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Comment> comments;


    @OneToMany(mappedBy = "dislikedPost")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<PostDislike> postDislikes;

    @OneToMany(mappedBy = "likedPost")
    @OnDelete(action=OnDeleteAction.CASCADE)
    private List<PostLike> postLikes;


    @PrePersist
    protected void onCreate() {
        created = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    public Post() {
    }

    public Post(String body) {
        this.body = body;
    }

    public Post setUpdatePostValues(Post updatedPost) {
        // this is redundant code as the user can only update post body
        if (updatedPost.getBody() == null) {
            updatedPost.setBody(this.getBody());
        }
        // this persists the original date created so that it is not set to null
        updatedPost.onCreate();
        //gets the original comments for the post.
        updatedPost.setComments(this.getComments());
        return updatedPost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getPostOwner() {
        return this.postOwner;
    }

    public void setPostOwner(User postOwner) {
        this.postOwner = postOwner;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
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

    public Group getGroupOwner() {
        return this.groupOwner;
    }

    public void setGroupOwner(Group groupOwner) {
        this.groupOwner = groupOwner;
    }


    public List<PostDislike> getPostDislikes() {
        return postDislikes;
    }

    public void setPostDislikes(List<PostDislike> postDislikes) {
        this.postDislikes = postDislikes;


    public List<PostLike> getPostLikes() {
        return postLikes;
    }

    public void setPostLikes(List<PostLike> postLikes) {
        this.postLikes = postLikes;

    }
}
