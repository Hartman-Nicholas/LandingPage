package se.kth.sda.legalAliens.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.kth.sda.legalAliens.comments.Comment;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@Service
public class PostService {

    PostRepository postRepository;
    UserService userService;

    @Autowired
    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public Post updatePost(Long id, Post updatedPost, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }

        post.setBody(updatedPost.getBody());
        post.setPostOwner(post.getPostOwner());
        post.setGroupOwner(post.getGroupOwner());
        post.setId(id);
        post.setComments(post.getComments());

        postRepository.save(post);
        return post;
    }

    public Post deletePost(Long id, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        return post;
    }
}
