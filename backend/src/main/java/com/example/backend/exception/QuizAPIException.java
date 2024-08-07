package com.example.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class QuizAPIException extends RuntimeException{

    private HttpStatus status;
    private String message;

}
