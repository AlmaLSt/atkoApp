package org.atko.AtkoApp.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ReviewDTO {
    private long id;
    private ProfessionalDTO professional;
    private ClientDTO clients;
    private String description;

}
