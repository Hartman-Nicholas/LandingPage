package se.kth.sda.legalAliens.comments.commentdislikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.comments.CommentRepository;
import se.kth.sda.legalAliens.exception.NoDuplicateException;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/comments")
@Controller
public class CommentDislikeController {
    CommentRepository commentRepository;
    UserService userService;
    PostRepository postRepository;
    CommentDislikeRepository commentDislikeRepository;
    CommentDislikeService commentDislikeService;

    @Autowired
    public CommentDislikeController(CommentRepository commentRepository, UserService userService, PostRepository postRepository, CommentDislikeRepository commentDislikeRepository, CommentDislikeService commentDislikeService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postRepository = postRepository;
        this.commentDislikeRepository = commentDislikeRepository;
        this.commentDislikeService = commentDislikeService;
    }


    // Return dislikes by given comment
    @GetMapping("/{commentId}/dislikes")
    public ResponseEntity<List<CommentDislike>> getCommentDislikes(@PathVariable Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        List<CommentDislike> commentDislikes = comment.getCommentDislikes();
        return ResponseEntity.ok(commentDislikes);
    }

    @GetMapping("/{commentId}/dislikes/check")
    public ResponseEntity<CommentDislike> checkIfLiked(@PathVariable Long commentId, Principal principal) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);

        CommentDislike dislikeCheck = commentDislikeService.checkDislike(comment, user);

        if(dislikeCheck == null) {
            throw new ResourceNotFoundException();
        } else {
            return ResponseEntity.ok(dislikeCheck);
        }
    }

    // Create dislike on a given comment
    @PostMapping("/{commentId}/dislikes")
    public ResponseEntity<CommentDislike> createCommentDislike(@PathVariable Long commentId, @RequestBody CommentDislike dislike, Principal principal) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        if(commentDislikeService.checkDislike(comment,user)==null) {
            dislike.setCommentDislikeOwner(user);
           dislike.setDislikedComment(comment);
           commentDislikeRepository.save(dislike);

        } else {
            throw new NoDuplicateException();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(dislike);
    }

    // Delete given dislike
    @DeleteMapping("/dislikes/{Id}") //Id with capital I to maintain the naming convention for routes
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePostDislike(@PathVariable Long Id) {      // Id with capital I to maintain route naming convention.
        CommentDislike commentDislike = commentDislikeRepository.findById(Id).orElseThrow(ResourceNotFoundException::new);
        commentDislikeRepository.delete(commentDislike);

    }

}



