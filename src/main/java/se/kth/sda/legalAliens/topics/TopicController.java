package se.kth.sda.legalAliens.topics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.legalAliens.exception.ResourceNotFoundException;


import java.util.List;

@RequestMapping("/topics")
@RestController
public class TopicController {

    TopicRepository topicRepository;
    private boolean hasRun = false;

    @Autowired
    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }


    @GetMapping
    public List<Topic> getAllTopics() {
       List <Topic> topics = topicRepository.findAll();
        return topics;
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<Topic> getTopic (@PathVariable Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(topic);
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic () {
        Topic topic = new Topic();
        if (!hasRun) {
            String[] topicsArray = new String[]{"Sport", "Entertainment", "Health", "Education", "Family"};
            for (String value : topicsArray) {
                topic = new Topic(value);
                topicRepository.save(topic);
            }
            hasRun = true;
        }


        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }



}
