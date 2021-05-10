package se.kth.sda.legalAliens.comments.CommentLike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.comments.CommentRepository;
import se.kth.sda.legalAliens.exception.NoDuplicateException;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.posts.postlike.PostLike;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/comments")
@Controller
public class CommentLikeController {

    CommentRepository commentRepository;
    CommentLikeRepository commentLikeRepository;
    CommentLikeService commentLikeService;
    UserService userService;
    PostRepository postRepository;


    @Autowired
    public CommentLikeController(CommentRepository commentRepository, CommentLikeRepository commentLikeRepository, CommentLikeService commentLikeService, UserService userService, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.commentLikeService = commentLikeService;
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

    @GetMapping("/{commentId}/likes/check")
    public ResponseEntity<CommentLike> checkIfLiked(@PathVariable Long commentId, Principal principal) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);

        CommentLike likeCheck = commentLikeService.checkLike(comment, user);

        if(likeCheck == null) {
            throw new ResourceNotFoundException();
        } else {
            return ResponseEntity.ok(likeCheck);
        }
    }

    // Create like on given comment
    @PostMapping("/{commentId}/likes")
    public ResponseEntity<CommentLike> createCommentLike(@PathVariable Long commentId, @RequestBody CommentLike like, Principal principal) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);

        if(commentLikeService.checkLike(comment,user)==null) {
            like.setLikedComment(comment);
            like.setCommentLikedOwner(user);
            commentLikeRepository.save(like);
        } else {
            throw new NoDuplicateException();
        }

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

