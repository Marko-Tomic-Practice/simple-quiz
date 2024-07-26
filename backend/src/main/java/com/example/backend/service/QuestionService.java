package com.example.backend.service;

import com.example.backend.entity.Question;

import java.util.List;

public interface QuestionService {
    Question addQuestion(Question question);

    List<Question> getAllQuestions();

    Question getQuestionById(Long quesitonId);

    Question editQuestion(Long questionId, Question question);

    void deleteQuestion(Long questionId);
}
