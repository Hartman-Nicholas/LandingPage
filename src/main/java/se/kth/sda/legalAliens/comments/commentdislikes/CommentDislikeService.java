package se.kth.sda.legalAliens.comments.commentdislikes;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.user.User;


@Service
public class CommentDislikeService {

    public CommentDislike checkDislike(Comment comment, User user) {
        if (comment.getCommentDislikes().stream().anyMatch(commentDislike -> commentDislike.getCommentDislikeOwner().equals(user))) {
            return comment.getCommentDislikes().stream().filter(commentDislike -> commentDislike.getCommentDislikeOwner().equals(user)).findFirst().get();
        } else {
            return null;
        }
    }

}
