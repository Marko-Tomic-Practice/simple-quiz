package com.example.backend.service.impl;

import com.example.backend.dto.RegisterDto;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.QuizAPIException;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public String register(RegisterDto registerDto) {

        //  Check username is already existing in DB
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new QuizAPIException(HttpStatus.BAD_REQUEST, "User already exists!");
        }

        //  Check email is already existing in DB
        if (userRepository.existsByUsername(registerDto.getEmail())) {
            throw new QuizAPIException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        //  Stvaram novog praznog korisnika
        User user = new User();

        //  Dodajem mu name, username, sifru dobijenu sa klijenta
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        //  Stvaram prazan SET uloga
        Set<Role> roles = new HashSet<>();
        //  Pronalazim ulogu obicnog korisnika (ROLE_USER)
        Role userRole = roleRepository.findByName("ROLE_USER");
        //  SET-u pridodajem korisnicku ulogu
        roles.add(userRole);

        //  Korisniku pridodajem SET uloga koji ima (za sada samo obican korisnik)
        user.setRoles(roles);

        //  Cuvam korisnika u repo, a iz repo u DB
        userRepository.save(user);

        //  Izlazna poruka
        return "User registered successfully!";
    }
}
