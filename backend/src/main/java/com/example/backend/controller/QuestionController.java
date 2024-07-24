package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/add-questions")
@AllArgsConstructor
public class QuestionController {

    private QuestionService questionService;

    // Create Question
    @PostMapping()
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){

        Question addedQuestion = questionService.addQuestion(question);

        return new ResponseEntity<>(addedQuestion, HttpStatus.CREATED);
    }

}
