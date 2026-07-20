package models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public record Order(
        Long id,
        Long petId,
        Integer quantity,
        String status,
        Boolean complete
) {
}