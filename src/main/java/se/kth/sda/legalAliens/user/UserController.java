package se.kth.sda.legalAliens.user;

import java.security.Principal;

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


    @PostMapping
    public ResponseEntity<User> updateLogIn(Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        user.setFirstLogIn(false);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public  ResponseEntity<User> updateUser (@RequestBody User updateUserData, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        updateUserData = userService.updateUser(user, updateUserData);
        userRepository.save(updateUserData);
        return ResponseEntity.ok(updateUserData);
    }
}
