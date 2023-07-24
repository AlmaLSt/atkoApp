package org.atko.AtkoApp.controller;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.CategoryDTO;
import org.atko.AtkoApp.modelDTO.ClientDTO;
import org.atko.AtkoApp.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/client")
@RequiredArgsConstructor
public class clientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAll(){
        return new ResponseEntity<>(clientService.getClients(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ClientDTO getClientById(@PathVariable("id") Long id){
        return clientService.getClientById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveClient(@RequestBody ClientDTO client){
        clientService.saveClient(client);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateClient(@PathVariable("id") Long id, @RequestBody ClientDTO client){
        clientService.updateClient(id, client);
    }

    @DeleteMapping("/{id}")
    public void deleteCLient(@PathVariable("id") Long id){
        clientService.deleteClient(id);
    }
}
