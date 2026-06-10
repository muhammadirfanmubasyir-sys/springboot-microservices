how calling rest api from another rest api in spring boot using rest client
===========================================================================
1. Define the RestClient Bean
-----------------------------
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient externalApiClient() {
        return RestClient.builder()
                .baseUrl("https://example.com") // Target REST API URL
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}

2. Create the Data Models (DTOs)
--------------------------------
// Data structure returned by the external API
public record ExternalUser(Long id, String name, String email) {}

// Data structure you want to send or return in your own API
public record UserResponse(Long userId, String displayName) {}

3. Create the Service Layer
---------------------------
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class UserService {

    private final RestClient restClient;

    // Spring auto-injects the named bean
    public UserService(RestClient externalApiClient) {
        this.restClient = externalApiClient;
    }

    public UserResponse FetchAndProcessUser(Long id) {
        // Calling GET https://example.com{id}
        ExternalUser externalUser = restClient.get()
                .uri("/users/{id}", id)
                .retrieve()
                .body(ExternalUser.class); // Automatically deserializes JSON to Record

        // Process and transform the external data
        return new UserResponse(externalUser.id(), externalUser.name());
    }
}

4. Expose Your Own REST API
---------------------------
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserProxyController {

    private final UserService userService;

    public UserProxyController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/proxy-user/{id}")
    public UserResponse getProxyUser(@PathVariable Long id) {
        // Calls the service, which in turn calls the external API
        return userService.FetchAndProcessUser(id);
    }
}

5.  Common HTTP Operations with RestClient
------------------------------------------
<> POST Request
ExternalUser newUser = new ExternalUser(null, "John", "john@mail.com");
ExternalUser response = restClient.post()
        .uri("/users")
        .body(newUser)
        .retrieve()
        .body(ExternalUser.class);

<> PUT Request
restClient.put()
        .uri("/users/{id}", id)
        .body(updatedUserObject)
        .retrieve()
        .toBodilessEntity(); // Extracts headers/status code without a response body

<> DELETE Request
restClient.delete()
        .uri("/users/{id}", id)
        .retrieve()
        .toBodilessEntity();
