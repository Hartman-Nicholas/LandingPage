package se.kth.sda.legalAliens.posts.postdislikes;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

@Service
public class PostDislikeService {

    public boolean checkDislike(Post post, User user) {
        return post.getPostDislikes().stream().anyMatch(postDislike -> postDislike.getPostDislikeOwner().equals(user));

    }
}







