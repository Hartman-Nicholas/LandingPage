package se.kth.sda.legalAliens.posts.postdislikes;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

@Service
public class PostDislikeService {

    public PostDislike checkDislike(Post post, User user) {
        if (post.getPostDislikes().stream().anyMatch(postDislike -> postDislike.getPostDislikeOwner().equals(user))) {
            return post.getPostDislikes().stream().filter(postDislike -> postDislike.getPostDislikeOwner().equals(user)).findFirst().get();
        } else {
            return null;
        }
    }
}







