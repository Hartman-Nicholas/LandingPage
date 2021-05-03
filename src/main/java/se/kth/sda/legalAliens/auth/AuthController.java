package se.kth.sda.legalAliens.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        userService.register(user);

        String token = authService.createAuthToken(user.getEmail());
        AuthResponse authResponse = new AuthResponse(token);

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest) {
        try {
            String token = authService.authenticate(authRequest.getEmail(), authRequest.getPassword());
            AuthResponse authResponse = new AuthResponse(token);

            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } catch (AuthenticationException authenticationException) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping ("/register/{userName}")
    public boolean checkUserName (@PathVariable String userName) {
        User user = userService.findUserByName(userName);
        return user != null;
    }

}
