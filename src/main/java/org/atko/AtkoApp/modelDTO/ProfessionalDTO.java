package org.atko.AtkoApp.modelDTO;

import lombok.*;

import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ProfessionalDTO {
    private long id;
    private String name;
    private int edad;
    private String telefono;
    private String email;
    private String areaTrabajo;
    private CategoryDTO category;
    private Set<ClientDTO> employmentContracts;
}
