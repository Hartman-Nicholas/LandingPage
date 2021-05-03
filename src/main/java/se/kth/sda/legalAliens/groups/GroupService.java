package se.kth.sda.legalAliens.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.topics.Topic;
import se.kth.sda.legalAliens.topics.TopicRepository;
import se.kth.sda.legalAliens.user.User;
import se.kth.sda.legalAliens.user.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {
    GroupRepository groupRepository;
    UserService userService;
    TopicRepository topicRepository;

  @Autowired
    public GroupService(GroupRepository groupRepository, UserService userService, TopicRepository topicRepository) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.topicRepository = topicRepository;
    }

    public ResponseEntity<Group> deleteTopicFromGroup(Long groupId, Long topicId) {
        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        Topic topic = topicRepository.findById(topicId).orElseThrow(ResourceNotFoundException::new);
        group.getTopics().remove(topic);
        topic.getGroupsWithTopic().remove(group);
        groupRepository.save(group);
        topicRepository.save(topic);
        return ResponseEntity.ok(group);
    }

    public List<Group> filterGroupList(Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        List<Group> groups = groupRepository.findAll();

        List<Group> filterGroups;
        filterGroups = groups.stream()
                .filter( group -> !(group.getGroupOwner().equals(user)))
                .filter(group -> !(group.getMembers().contains(user)))
                .collect(Collectors.toList());

        return filterGroups;

    }
}
