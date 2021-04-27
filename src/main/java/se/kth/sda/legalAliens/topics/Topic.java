package se.kth.sda.legalAliens.topics;

import se.kth.sda.legalAliens.groups.Group;

import javax.persistence.*;
import java.util.List;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String topic;

    @ManyToMany(mappedBy = "topics")
    private List<Group> groupsWithTopic;


    public Topic() {
    }

    public Topic(String topic) {
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public List<Group> getGroupsWithTopic() {
        return groupsWithTopic;
    }

    public void setGroupsWithTopic(List<Group> groupsWithTopic) {
        this.groupsWithTopic = groupsWithTopic;
    }
}
