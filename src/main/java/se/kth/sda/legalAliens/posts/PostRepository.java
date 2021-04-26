package se.kth.sda.legalAliens.posts;

import org.springframework.data.jpa.repository.JpaRepository;

/*
    @TODO extend the appropriate JpaRepository to get common database operations for Post
 */
public interface PostRepository extends JpaRepository<Post, Long> {
}
