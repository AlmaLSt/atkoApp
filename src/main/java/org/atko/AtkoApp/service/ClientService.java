package org.atko.AtkoApp.service;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.CategoryDTO;
import org.atko.AtkoApp.modelDTO.ClientDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    @Value("${spring.external.service.base-url}")
    private String basePath;

    private final RestTemplate restTemplate;

    public List<ClientDTO> getClients(){
        ClientDTO[] response = restTemplate.getForObject(basePath + "/clients", ClientDTO[].class);
        return Arrays.asList(response);
    }

    public ClientDTO getClientById(Long id){
        return restTemplate.getForObject(basePath + "/clients/" + id, ClientDTO.class);
    }

    public void saveClient(ClientDTO client){
        restTemplate.postForObject(basePath + "/clients", client, ClientDTO.class);
    }

    public void updateClient(Long id, ClientDTO client){
        restTemplate.put(basePath + "/clients/" + id, client);
    }

    public void deleteClient(Long id){
        restTemplate.delete(basePath + "/clients/" + id);
    }
}
