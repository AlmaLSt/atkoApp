package org.atko.AtkoApp.service;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.CategoryDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Value("${spring.external.service.base-url}")
    private String basePath;

    private final RestTemplate restTemplate;

    public List<CategoryDTO> getCategories(){
        CategoryDTO[] response = restTemplate.getForObject(basePath+"/categories", CategoryDTO[].class);
        return Arrays.asList(response);
    }

    public void saveCategory(CategoryDTO category){
        restTemplate.postForObject(basePath+"/categories", category, CategoryDTO.class);
    }

    public void updateCategory(Long id, CategoryDTO category){
        restTemplate.put(basePath+"/categories/" + id, category);
    }

    public void deleteCategory(Long id){
        restTemplate.delete(basePath+"/categories/" + id);
    }
}
