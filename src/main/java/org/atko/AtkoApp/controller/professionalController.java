package org.atko.AtkoApp.controller;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.ProfessionalDTO;
import org.atko.AtkoApp.service.CategoryService;
import org.atko.AtkoApp.service.ProfessionalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/professional")
@RequiredArgsConstructor
public class professionalController {

    private final ProfessionalService professionalService;
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<ProfessionalDTO>> getAll(){
        return new ResponseEntity<>(professionalService.getProfessionals(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ProfessionalDTO getProfessionalById(@PathVariable("id") Long id){
       return professionalService.getProfessionalById(id);
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveProfessional(@RequestBody ProfessionalDTO professional){
        professionalService.saveProfessional(professional);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateProfessional(@PathVariable("id") Long id, @RequestBody ProfessionalDTO professional){
        professionalService.updateProfessional(id, professional);
    }

    @DeleteMapping("/{id}")
    public void deleteProfessional(@PathVariable("id") Long id){
        professionalService.deleteProfessional(id);
    }
}
