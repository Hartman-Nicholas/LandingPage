package se.kth.sda.legalAliens.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/comments")
@RestController
public class CommentController {

    CommentRepository commentRepository;
    PostRepository postRepository;
    UserService userService;
    CommentService commentService;

    @Autowired

    public CommentController(CommentRepository commentRepository, PostRepository postRepository,
            UserService userService, CommentService commentService) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userService = userService;
        this.commentService = commentService;
    }

    // List all comments for a given post
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> listAllCommentsOnPost(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post.getComments());
    }

    // Create a comment on a given post.
    @PostMapping("/{postId}")
    public ResponseEntity<Comment> createComment(@PathVariable Long postId, @RequestBody Comment comment,
            Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);

        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        comment.setUserCommentOwner(user);

        comment.setCommentOwner(post);
        commentRepository.save(comment);

        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    // Update a comment by the given commentId
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment,
            Principal principal) {
        Comment comment = commentService.updateComment(commentId, updatedComment, principal);
        return ResponseEntity.ok(comment);
    }

    // Delete a comment by the five commentId
    @DeleteMapping("/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long commentId, Principal principal) {
        Comment comment = commentService.deleteComment(commentId, principal);
        commentRepository.delete(comment);
    }
}