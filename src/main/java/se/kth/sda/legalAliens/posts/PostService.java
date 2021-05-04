package se.kth.sda.legalAliens.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;

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
        // and update someone else's post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();

        }
        // calling the method that updates the field. the method is in the Post class
        updatedPost = post.setUpdatePostValues(updatedPost);
        //setting the original id of the post
        updatedPost.setId(id);
        //setting the original owner of the post. this will never change.
        updatedPost.setPostOwner(user);
        postRepository.save(updatedPost);
        return updatedPost;
    }

    public Post deletePost(Long id, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone else's post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        postRepository.delete(post);
        return post;
    }
}
