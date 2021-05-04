package se.kth.sda.legalAliens.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.posts.Post;
import se.kth.sda.legalAliens.posts.PostRepository;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service()
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private PostRepository postRepository;


    public UserService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findUserByName(String name) {
        return userRepository.findByName(name);
    }

    public List<Post> getUserFeed (Principal principal) {
        String userName = principal.getName();
        User user = findUserByEmail(userName);
        List<Post> posts = postRepository.findAll();
        List<Post> filterPosts;
        filterPosts = posts.stream()
                .filter(post -> (post.getGroupOwner().getMembers().contains(user)) || post.getGroupOwner().getGroupOwner().equals(user)).collect(Collectors.toList());
        return filterPosts;

    }

    public User updateUser (User user, User updateUserData) {
        updateUserData = user.setUpdateUser(updateUserData);
        updateUserData.setId(user.getId());
        updateUserData.setComments(user.getComments());
        updateUserData.setFirstLogIn(user.getFirstLogIn());
        updateUserData.setGroupsCreated(user.getGroupsCreated());
        updateUserData.setGroupsJoined(user.getGroupsJoined());
        updateUserData.setPosts(user.getPosts());
        return updateUserData;
    }


    public void register(User user) {
        String encryptedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPass);
        userRepository.save(user);
    }
}
