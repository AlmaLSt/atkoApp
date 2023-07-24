package org.atko.AtkoApp.controller;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.CategoryDTO;
import org.atko.AtkoApp.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/category")
@RequiredArgsConstructor
public class categoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll(){
        return new ResponseEntity<>(categoryService.getCategories(), HttpStatus.OK);
    }

//    @GetMapping
//    public String getAllCategories(Model model){
//        List<CategoryDTO> categories = categoryService.getCategories();
//        model.addAttribute("categories", categories);
//        return "homeProfessionals";
//    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCategory(@RequestBody CategoryDTO category){
        categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCategory(@PathVariable("id") Long id, @RequestBody CategoryDTO category){
        categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
    }
}
