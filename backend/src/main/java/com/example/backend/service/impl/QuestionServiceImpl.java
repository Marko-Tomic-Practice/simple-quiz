package com.example.backend.service.impl;

import com.example.backend.entity.Question;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {

        return questionRepository.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question getQuestionById(Long questionId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question with "+ questionId + " doesn't exist"));

        return question;
    }


    @Override
    public Question editQuestion(Long questionId, Question question) {

        Question questionDB = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question with "+ questionId + " doesn't exist"));

        questionDB.setQtext(question.getQtext());
        questionDB.setAnswers(question.getAnswers());

        Question updatedQuestion = questionRepository.save(questionDB);

        return updatedQuestion;
    }

    @Override
    public void deleteQuestion(Long questionId) {

        questionRepository.deleteById(questionId);

    }
}
