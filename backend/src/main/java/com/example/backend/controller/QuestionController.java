package com.example.backend.controller;

import com.example.backend.entity.Question;
import com.example.backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class QuestionController {

    private QuestionService questionService;

    // Create Question
    @PostMapping("/add-questions")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){

        Question addedQuestion = questionService.addQuestion(question);

        return new ResponseEntity<>(addedQuestion, HttpStatus.CREATED);
    }
    @GetMapping("/edit-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){

        List<Question> questions = questionService.getAllQuestions();

        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/edit-questions/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable("id") Long questionId){
//        System.out.println(questionId);
        Question question = questionService.getQuestionById(questionId);

        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PutMapping("/edit-questions/{id}")
    public ResponseEntity<Question> editQuestion(@PathVariable("id") Long questionId,
                                                 @RequestBody Question question){
        Question updatedQuestion = questionService.editQuestion(questionId, question);

        return new ResponseEntity<>(updatedQuestion, HttpStatus.CREATED);
    }

    @DeleteMapping("/edit-questions/{id}")
    public void  deleteQuestion(@PathVariable("id") Long questionId){
        questionService.deleteQuestion(questionId);
    }

}
