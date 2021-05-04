package se.kth.sda.legalAliens.posts.postdislikes;

import java.security.Principal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;


@RequestMapping("/posts")
@Controller
public class PostDislikeController {

    PostRepository postRepository;
    PostDislikeRepository postDislikeRepository;

    public PostDislikeController(PostRepository postRepository,
                                    PostDislikeRepository postDislikeRepository) {
        this.postRepository = postRepository;
        this.postDislikeRepository = postDislikeRepository;
    }

    // Return dislikes by given post
    @GetMapping("/{postId}/dislikes")
    public ResponseEntity<List<PostDislike>> getPostDislikes(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        List<PostDislike> postDislikes = post.getPostDislikes();
        return ResponseEntity.ok(postDislikes);
    }

    // Create dislikes on given article
    @PostMapping("/{postId}/dislikes")
    public ResponseEntity<PostDislike> createPostDislike(@PathVariable Long postId, @RequestBody PostDislike dislike, Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        dislike.setPostDislikeOwner(post);
        postDislikeRepository.save(dislike);
        return ResponseEntity.status(HttpStatus.CREATED).body(dislike);
    }

    // Delete given dislike
    @DeleteMapping("/dislikes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePostDislike(@PathVariable Long id) {
        PostDislike postDislike = postDislikeRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
        postDislikeRepository.delete(postDislike);
    }
}


