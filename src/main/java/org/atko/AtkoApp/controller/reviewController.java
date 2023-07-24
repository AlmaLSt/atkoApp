package org.atko.AtkoApp.controller;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.ReviewDTO;
import org.atko.AtkoApp.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/review")
@RequiredArgsConstructor
public class reviewController {
    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAll(){
        return new ResponseEntity<>(reviewService.getReviews(), HttpStatus.OK);
    }

    @GetMapping("/{professional_id}")
    public List<ReviewDTO> getReviewByProfessional(@PathVariable("professional_id") Long professional_id){
        return reviewService.getReviewsByProfessional(professional_id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveReview(@RequestBody ReviewDTO review){
        reviewService.saveReview(review);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateReview(@PathVariable("id") Long id, @RequestBody ReviewDTO review){
        reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable("id") Long id){
        reviewService.deleteReview(id);
    }
}
