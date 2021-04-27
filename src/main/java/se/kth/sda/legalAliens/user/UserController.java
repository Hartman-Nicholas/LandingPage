package se.kth.sda.legalAliens.user;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping ("/{userName}")
    public boolean checkUserName (@PathVariable String userName) {
        User user = userService.findUserByName(userName);
        return user != null;
    }

    @PostMapping("/{someValue}")
    public ResponseEntity<User> updateLogIn(Principal principal, @PathVariable boolean someValue) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        user.setFirstLogIn(someValue);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping
    public  ResponseEntity<User> updateUser (@RequestBody User updateUser, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        updateUser = user.setUpdateUser(updateUser);
        updateUser.setId(user.getId());
        updateUser.setComments(user.getComments());
        updateUser.setFirstLogIn(user.getFirstLogIn());
        updateUser.setGroupsCreated(user.getGroupsCreated());
        updateUser.setGroupsJoined(user.getGroupsJoined());
        updateUser.setPosts(user.getPosts());
        userRepository.save(updateUser);
        return ResponseEntity.ok(updateUser);

    }

}
