package se.kth.sda.legalAliens.posts.postlike;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/posts")
@Controller
public class PostLikeController {

    PostRepository postRepository;
    PostLikeRepository postLikeRepository;
    UserService userService;

    public PostLikeController(PostRepository postRepository, PostLikeRepository postLikeRepository, UserService userService) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.userService = userService;
    }

    // Return likes on given post

    @GetMapping("/{postId}/likes")
    public ResponseEntity<List<PostLike>> getPostLikes(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        List<PostLike> postLikes = post.getPostLikes();
        return ResponseEntity.ok(postLikes);
    }

    // Create like on given post
    @PostMapping("/{postId}/likes")
    public ResponseEntity<PostLike> createPostLike(@PathVariable Long postId, @RequestBody PostLike like, Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        like.setLikedPost(post);
        like.setPostLikedOwner(user);
        postLikeRepository.save(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(like);
    }

    // Delete given like.
    @DeleteMapping("/likes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePostLike(@PathVariable Long id) {
        PostLike postLike = postLikeRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        postLikeRepository.delete(postLike);
    }

}