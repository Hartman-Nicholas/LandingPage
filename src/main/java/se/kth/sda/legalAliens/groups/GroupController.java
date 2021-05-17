package se.kth.sda.legalAliens.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.topics.Topic;
import se.kth.sda.legalAliens.topics.TopicRepository;
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
    TopicRepository topicRepository;


    @Autowired
    public GroupController(GroupRepository groupRepository, UserService userService, GroupService groupService, TopicRepository topicRepository) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.groupService = groupService;
        this.topicRepository = topicRepository;
    }

    // Return all Groups not created or joined by user.
    @GetMapping
    public List<Group> listAllGroups(Principal principal) {
        return groupService.filterGroupList(principal);
    }

    // Return a specific group based on the groupId.
    @GetMapping("/{groupId}")
    public ResponseEntity<Group> getGroup(@PathVariable Long groupId) {
        Group post = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    // Return a specific group based on the group title
    @GetMapping("/title/{groupTitle}")
    public boolean checkGroupTitle (@PathVariable String groupTitle) {
        Group group = groupRepository.findByTitle(groupTitle);
        return group != null;
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

    @PostMapping("/{groupId}")
    public ResponseEntity<Group> createMembership(@PathVariable Long groupId, Principal principal) {

        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);

        group.getMembers().add(user);
        groupRepository.save(group);

        return ResponseEntity.status(HttpStatus.CREATED).body(group);

    }


    @PostMapping("/{groupId}/topics/{topicId}")
    public ResponseEntity<Group> createTopicMembership(@PathVariable Long groupId, @PathVariable Long topicId) {
        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        Topic topic = topicRepository.findById(topicId).orElseThrow(ResourceNotFoundException::new);
        group.getTopics().add(topic);
        groupRepository.save(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }


    //Update group tile, group description, group rules or group avatar only
    @PutMapping("/{groupId}")
    public ResponseEntity<Group> updateGroup(@PathVariable Long groupId, @RequestBody Group updatedGroup, Principal principal){
        Group group = groupService.updateGroup(groupId, updatedGroup, principal);
        return ResponseEntity.ok(group);
    }

    @DeleteMapping("/{groupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroup(@PathVariable Long groupId, Principal principal) {
        groupService.deleteGroup(groupId, principal);
    }

       @DeleteMapping("/{groupId}/topics/{topicId}")
    public ResponseEntity<Group> deleteTopicFromGroup(@PathVariable Long groupId, @PathVariable Long topicId) {
       return groupService.deleteTopicFromGroup(groupId,topicId);
   }

    @DeleteMapping("/{groupId}/user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroupMembership(@PathVariable Long groupId, Principal principal) {
        groupService.deleteGroupMembership(groupId, principal);
    }

}
