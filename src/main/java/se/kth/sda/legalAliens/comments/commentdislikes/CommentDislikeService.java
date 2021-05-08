package se.kth.sda.legalAliens.comments.commentdislikes;

import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.user.User;


@Service
public class CommentDislikeService {

    public boolean checkDislike(Comment comment, User user) {
        return comment.getCommentDislikes().stream().anyMatch(commentDislike -> commentDislike.getCommentDislikeOwner().equals(user));

    }

}
