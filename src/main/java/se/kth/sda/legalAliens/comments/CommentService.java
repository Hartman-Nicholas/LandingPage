package se.kth.sda.legalAliens.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;

@Service
public class CommentService {

    CommentRepository commentRepository;
    UserService userService;

    @Autowired

    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public Comment updateComment(Long id, Comment updatedComment, Principal principal) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        // Security measure to ensure a logged in User doesn't access the update Route
        // and update someone else's comment.
        if (!userName.equals(comment.getUserCommentOwner().getEmail())) {
            throw new ResourceNotFoundException();

        }
        updatedComment.setId(id);
        updatedComment.setCommentOwner(comment.getCommentOwner());
        updatedComment.setUserCommentOwner(user);
        commentRepository.save(updatedComment);
        return updatedComment;
    }

    public void deleteComment(Long id, Principal principal) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        String userName = principal.getName();
        // Security measure to ensure a logged in User doesn't access the delete Route
        // and delete someone else's comment.

        if (userName.equals(comment.getCommentOwner().getGroupOwner().getGroupOwner().getEmail())) {
            commentRepository.delete(comment);
        } else if (userName.equals(comment.getUserCommentOwner().getEmail())) {
            commentRepository.delete(comment);
        } else if (!userName.equals(comment.getUserCommentOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
    }
}
