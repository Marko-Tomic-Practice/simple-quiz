package com.example.backend.service;

import com.example.backend.dto.RegisterDto;

public interface AuthService {

    String register(RegisterDto registerDto);

}
