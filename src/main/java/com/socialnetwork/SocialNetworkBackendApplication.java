package com.socialnetwork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.socialnetwork.utils.FileUploadProperties;

@SpringBootApplication
@EnableJpaAuditing
@EnableWebSecurity
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class SocialNetworkBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialNetworkBackendApplication.class, args);
	}

}
