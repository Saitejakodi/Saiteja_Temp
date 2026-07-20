package models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record User(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        String phone,
        Integer userStatus
) {
}