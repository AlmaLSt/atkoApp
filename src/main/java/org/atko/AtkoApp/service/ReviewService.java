package org.atko.AtkoApp.service;

import lombok.RequiredArgsConstructor;
import org.atko.AtkoApp.modelDTO.ProfessionalDTO;
import org.atko.AtkoApp.modelDTO.ReviewDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Value("${spring.external.service.base-url}")
    private String basePath;

    private final RestTemplate restTemplate;

    public List<ReviewDTO> getReviews(){
        ReviewDTO[] response = restTemplate.getForObject(basePath + "/reviews", ReviewDTO[].class);
        return Arrays.asList(response);
    }

    public List<ReviewDTO> getReviewsByProfessional(Long professional_id){
        ReviewDTO[] response = restTemplate.getForObject(basePath + "/reviews/" + professional_id, ReviewDTO[].class );
        return Arrays.asList(response);
    }

    public void saveReview(ReviewDTO review){
        restTemplate.postForObject(basePath + "/reviews", review, ReviewDTO.class);
    }

    public void updateReview(Long id, ReviewDTO review){
        restTemplate.put(basePath + "/reviews/" + id, review);
    }

    public void deleteReview(Long id){
        restTemplate.delete(basePath + "/reviews/" + id);
    }

}
