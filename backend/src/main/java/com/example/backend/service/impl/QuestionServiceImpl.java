package com.example.backend.service.impl;

import com.example.backend.entity.Question;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {

        return questionRepository.save(question);
    }
}
