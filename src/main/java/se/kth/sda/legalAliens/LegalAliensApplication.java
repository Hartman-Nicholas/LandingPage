package se.kth.sda.legalAliens;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import se.kth.sda.legalAliens.topics.Topic;
import se.kth.sda.legalAliens.topics.TopicRepository;


@SpringBootApplication
public class LegalAliensApplication {

	public static void main(String[] args) {
		SpringApplication.run(LegalAliensApplication.class, args);

	}


	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE",
						"OPTIONS");
			}
		};
	}
}
