package org.atko.AtkoApp.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ClientDTO {
    private long id;
    private String name;
    private int edad;
    private String telefono;
    private String email;

    private Set<ProfessionalDTO> hired;
}
