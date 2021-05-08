package se.kth.sda.legalAliens.posts.postdislikes;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.exception.NoDuplicateException;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.groups.GroupRepository;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;


@RequestMapping("/posts")
@Controller
public class PostDislikeController {

    PostRepository postRepository;
    PostDislikeRepository postDislikeRepository;
    UserService userService;
    GroupRepository groupRepository;
    PostDislikeService postDislikeServices;

    @Autowired
    public PostDislikeController(PostRepository postRepository, PostDislikeRepository postDislikeRepository, UserService userService, GroupRepository groupRepository, PostDislikeService postDislikeServices) {
        this.postRepository = postRepository;
        this.postDislikeRepository = postDislikeRepository;
        this.userService = userService;
        this.groupRepository = groupRepository;
        this.postDislikeServices = postDislikeServices;
    }



    // Return dislikes by given post
    @GetMapping("/{postId}/dislikes")
    public ResponseEntity<List<PostDislike>> getPostDislikes(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        List<PostDislike> postDislikes = post.getPostDislikes();
        return ResponseEntity.ok(postDislikes);
    }

    @GetMapping("/{postId}/dislikes/check")
    public ResponseEntity<PostDislike> checkIfDisLiked(@PathVariable Long postId, Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        if(postDislikeServices.checkDislike(post, user) == null) {
            throw new ResourceNotFoundException();
        } else {
            return ResponseEntity.ok(postDislikeServices.checkDislike(post, user));
        }
    }

    // Create dislike on a given post
    @PostMapping("/{postId}/dislikes")
    public ResponseEntity<PostDislike> createPostDislike(@PathVariable Long postId, @RequestBody PostDislike dislike, Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);

        if(postDislikeServices.checkDislike(post, user)==null) {
            dislike.setPostDislikeOwner(user);
            dislike.setDislikedPost(post);
            postDislikeRepository.save(dislike);
        } else {
            throw new NoDuplicateException();
        }


        return ResponseEntity.status(HttpStatus.CREATED).body(dislike);
    }

    // Delete given dislike
    @DeleteMapping("/dislikes/{Id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePostDislike(@PathVariable Long Id) {
        PostDislike postDislike = postDislikeRepository.findById(Id)
                .orElseThrow(ResourceNotFoundException::new);
        postDislikeRepository.delete(postDislike);
    }
}


