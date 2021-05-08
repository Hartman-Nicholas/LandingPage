package se.kth.sda.legalAliens.posts.postlike;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

@Service
public class PostLikeService {

    public boolean checkLike(Post post, User user) {
        return post.getPostLikes().stream().anyMatch(postLike -> postLike.getPostLikedOwner().equals(user));

    }
}
