package se.kth.sda.legalAliens.comments.CommentLike;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;

import se.kth.sda.legalAliens.user.User;

@Service
public class CommentLikeService {

    public CommentLike checkLike(Comment comment, User user) {

        if (comment.getCommentLikes().stream().anyMatch(commentLike -> commentLike.getCommentLikedOwner().equals(user))) {
            return comment.getCommentLikes().stream().filter(commentLike -> commentLike.getCommentLikedOwner().equals(user)).findFirst().get();
        } else {
            return null;
        }
    }

}
