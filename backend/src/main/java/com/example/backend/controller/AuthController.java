package com.example.backend.controller;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.RegisterDto;
import com.example.backend.dto.SignInDto;
import com.example.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    //  Build Register REST API
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);

        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //  Build Sign In REST API
    @PostMapping("/sign-in")
    //  U ResponseEntity<JwtAuthResponse> prosledjujemo JwtAuthResponse to je DTO klasa
    public ResponseEntity<JwtAuthResponse> signin(@RequestBody SignInDto signInDto){
        //  nama je response postao token
        //  String response = authService.signin(signInDto);
        String token = authService.signin(signInDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);


    }

}
