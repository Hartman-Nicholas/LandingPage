package se.kth.sda.legalAliens.topics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;
import se.kth.sda.legalAliens.groups.Group;
import se.kth.sda.legalAliens.groups.GroupRepository;

import java.util.List;

@RequestMapping("/topics")
@RestController
public class TopicController {

    TopicRepository topicRepository;
    GroupRepository groupRepository;

    @Autowired
    public TopicController(TopicRepository topicRepository, GroupRepository groupRepository) {
        this.topicRepository = topicRepository;
        this.groupRepository = groupRepository;
    }

    @GetMapping
    public List<Topic> getAllTopics() {
       List <Topic> topics = topicRepository.findAll();
        return topics;
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic (@RequestBody Topic topic) {
        topicRepository.save(topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);

    }

    @PostMapping("/{topicId}/groups/{groupId}")
    public ResponseEntity<Topic> createTopicMembership(@PathVariable Long groupId, @PathVariable Long topicId) {
        Group group = groupRepository.findById(groupId).orElseThrow(ResourceNotFoundException::new);
        Topic topic = topicRepository.findById(topicId).orElseThrow(ResourceNotFoundException::new);

        topic.getGroupsWithTopic().add(group);

        topicRepository.save(topic);

        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }

}
