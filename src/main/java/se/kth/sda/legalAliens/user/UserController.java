package se.kth.sda.legalAliens.user;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.posts.Post;


@RequestMapping("/users")
@RestController
public class UserController {

    UserRepository userRepository;
    UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getUser(Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        return ResponseEntity.ok(user);
    }

    @GetMapping ("/feed")
    public ResponseEntity<List<Post>> getUserFeed (Principal principal) {

        List<Post> feedPosts = userService.getUserFeed(principal);
        return  ResponseEntity.ok(feedPosts);
    }


    @PostMapping
    public ResponseEntity<User> updateLogIn(Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        user.setFirstLogIn(false);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User updateUserData, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        updateUserData = userService.updateUser(user, updateUserData);
        userRepository.save(updateUserData);
        return ResponseEntity.ok(updateUserData);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        userRepository.delete(user);
    }


}
