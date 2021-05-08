package se.kth.sda.legalAliens.comments.CommentLike;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.user.User;

@Service
public class CommentLikeService {

    public boolean checkLike(Comment comment, User user) {
        return comment.getCommentLikes().stream().anyMatch(commentLike -> commentLike.getCommentLikedOwner().equals(user));

    }


}
