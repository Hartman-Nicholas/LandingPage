package se.kth.sda.legalAliens.comments.CommentLike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.comments.CommentRepository;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/comments")
@Controller
public class CommentLikeController {

    CommentRepository commentRepository;
    CommentLikeRepository commentLikeRepository;
    UserService userService;
    PostRepository postRepository;

    @Autowired
    public CommentLikeController(CommentRepository commentRepository, CommentLikeRepository commentLikeRepository, PostRepository postRepository, UserService userService) {

        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.userService = userService;
        this.postRepository = postRepository;
    }

    // Return likes on given comment

    @GetMapping("/{commentId}/likes")
    public ResponseEntity<List<CommentLike>> getCommentLikes(@PathVariable Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        List<CommentLike> commentLikes = comment.getCommentLikes();
        return ResponseEntity.ok(commentLikes);
    }

    // Create like on given comment
    @PostMapping("/{commentId}/likes")
    public ResponseEntity<CommentLike> createCommentLike(@PathVariable Long commentId, @RequestBody CommentLike like, Principal principal) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        like.setLikedComment(comment);
        like.setCommentLikedOwner(user);
        commentLikeRepository.save(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(like);
    }

    // Delete given like.
    @DeleteMapping("/likes/{Id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCommentLike(@PathVariable Long Id) {
        CommentLike commentLike = commentLikeRepository.findById(Id).orElseThrow(ResourceNotFoundException::new);
        commentLikeRepository.delete(commentLike);
    }

}

