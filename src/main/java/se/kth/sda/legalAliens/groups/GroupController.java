package se.kth.sda.legalAliens.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping("/groups")
@RestController
public class GroupController {

    GroupRepository groupRepository;
    UserService userService;
    GroupService groupService;

    @Autowired

    public GroupController(GroupRepository groupRepository, UserService userService, GroupService groupService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.groupService = groupService;
    }

    // Return all Groups.
    @GetMapping
    public List<Group> listAllGroups() {
        List<Group> groups = groupRepository.findAll();
        return groups;
    }

    // Return a specific post based on the groupId.
    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable Long id) {
        Group post = groupRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    // Create a new group on User given by Logged In User
    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody Group group, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        group.setGroupOwner(user);
        groupRepository.save(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }

}
