package se.kth.sda.legalAliens.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.legalAliens.comments.CommentRepository;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.groups.Group;
import se.kth.sda.legalAliens.groups.GroupRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/posts")
@RestController
public class PostController {

    PostRepository postRepository;
    GroupRepository groupRepository;
    PostService postService;
    UserService userService;
    CommentRepository commentRepository;

    @Autowired
    public PostController(PostRepository postRepository, GroupRepository groupRepository, PostService postService,
            UserService userService, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.groupRepository = groupRepository;
        this.postService = postService;
        this.userService = userService;
        this.commentRepository = commentRepository;
    }

    // Return all posts.
    @GetMapping
    public List<Post> listAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    // Return a specific post based on the postId.
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    // Create a new post on Group given by Logged In User and Group Id
    @PostMapping("/{groupId}")
    public ResponseEntity<Post> createGroupPost(@PathVariable Long groupId, @RequestBody Post post,
            Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        post.setPostOwner(user);
        post.setGroupOwner(group);
        postRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    // Update the post based on the provided postId
    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post updatedPost, Principal principal) {
        Post post = postService.updatePost(postId, updatedPost, principal);
        return ResponseEntity.ok(updatedPost);
    }

    // Delete the post based on the provided postId.

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long postId, Principal principal) {
        postService.deletePost(postId, principal);
    }
}

