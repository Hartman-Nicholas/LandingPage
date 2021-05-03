package se.kth.sda.legalAliens.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;

@Service
public class GroupService {


    GroupRepository groupRepository;
    UserService userService;

    @Autowired
    public GroupService(GroupRepository groupRepository, UserService userService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
    }

//    public User updateUser (User user, User updateUserData) {
//        updateUserData = user.setUpdateUser(updateUserData);
//        updateUserData.setId(user.getId());
//    return updateUserData;

    public Group updateGroup(Long id, Group updatedGroup, Principal principal) {
        Group group = groupRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone else's post.
        if (!userName.equals(group.getGroupOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        updatedGroup = group.setUpdatedGroupValues(updatedGroup);
        updatedGroup.setId(id);
        updatedGroup.setGroupOwner(user);
        groupRepository.save(updatedGroup);
        return updatedGroup;
    }

    public void deleteGroup(Long groupId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        if (!userName.equals(group.getGroupOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        groupRepository.delete(group);
    }




}
