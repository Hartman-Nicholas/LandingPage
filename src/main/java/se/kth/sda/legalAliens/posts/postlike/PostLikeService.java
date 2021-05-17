package se.kth.sda.legalAliens.posts.postlike;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.user.User;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PostLikeService {

    public PostLike checkLike(Post post, User user) {

        if (post.getPostLikes().stream().anyMatch(postLike -> postLike.getPostLikedOwner().equals(user))) {
            return post.getPostLikes().stream().filter(postLike -> postLike.getPostLikedOwner().equals(user)).findFirst().get();
        } else {
            return null;
        }
    }
}
