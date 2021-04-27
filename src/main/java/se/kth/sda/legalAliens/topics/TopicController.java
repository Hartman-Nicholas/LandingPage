package se.kth.sda.legalAliens.topics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RequestMapping("/topics")
@RestController
public class TopicController {

    TopicRepository topicRepository;

    @Autowired
    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }


    @GetMapping
    public List<Topic> getAllTopics() {
       List <Topic> topics = topicRepository.findAll();
        return topics;
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic () {
        Topic topic = new Topic();
			String[] topicsArray = new String[]{"Sport", "Entertainment", "Health", "Education", "Family"};
			for (String s : topicsArray) {
				topic = new Topic(s);
				topicRepository.save(topic);
			}
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }

}
