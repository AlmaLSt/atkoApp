package org.atko.AtkoApp.service;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.ProfessionalDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionalService {

    @Value("${spring.external.service.base-url}")
    private String basePath;

    private final RestTemplate restTemplate;

    public List<ProfessionalDTO> getProfessionals(){
        ProfessionalDTO[] response = restTemplate.getForObject(basePath+"/professionals", ProfessionalDTO[].class);
        return Arrays.asList(response);
    }

    public ProfessionalDTO getProfessionalById(Long id){
        return restTemplate.getForObject(basePath+"/professionals/"+id, ProfessionalDTO.class);
    }

    public void saveProfessional(ProfessionalDTO professional){
        restTemplate.postForObject(basePath+"/professionals", professional, ProfessionalDTO.class);
    }

    public void updateProfessional(Long id, ProfessionalDTO professional){
        restTemplate.put(basePath+"/professionals/" + id, professional);
    }

    public void deleteProfessional(Long id){
        restTemplate.delete(basePath+"/professionals/"+id);
    }


}
