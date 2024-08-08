package com.example.backend.service;

import com.example.backend.dto.RegisterDto;
import com.example.backend.dto.SignInDto;

public interface AuthService {

    String register(RegisterDto registerDto);

    String signin(SignInDto signInDto);

}
