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
        // Security measure to ensure a logged in User doesn't access the update Route
        // and update someone else's post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        updatedPost = post.setUpdatePostValues(updatedPost);
        updatedPost.setPostOwner(post.getPostOwner());
        updatedPost.setGroupOwner(post.getGroupOwner());
        updatedPost.setId(id);

        postRepository.save(updatedPost);
        return updatedPost;

    }

    public void deletePost(Long id, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        // Security measure to ensure a logged in User doesn't access the delete Route
        // and delete someone else's post.

        if (userName.equals(post.getGroupOwner().getGroupOwner().getEmail())) {
            postRepository.delete(post);
        } else if (userName.equals(post.getPostOwner().getEmail())) {
            postRepository.delete(post);
        } else if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
    }
}
