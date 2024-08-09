package com.example.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//  Execute before executing Spring Security Filters
//  Validate the JWT Token and providers user details to Spring Security for Authentication
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    //  Logika za pravljenje i manipulacijom tokena
    private JwtTokenProvider jwtTokenProvider;
    //  Podaci potrebni za generisanje tokena
    private UserDetailsService userDetailsService;

    //  Konstruktor (zasto nije koriscen @AllArgsConstructor?)
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }
    // Dobijeno nakon uvozenja OncePerRequestFilter-a
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        //  Get JWT Token from HTTP request
        //  Izvlacimo sirovi token iz Request Header-a
        String token = getTokenFromRequest(request);

        //  Validate Token
        //  Proveravamo da li je tu token i da li je taj token validan (sa nama-serverom)
        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)){
            //  Get username from token
            //  Izvlacimo username iz tokena
            String username = jwtTokenProvider.getUsername(token);
            //  Izvlacimo detalje iz DB
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            //  Pravimo authenticationToken koji sadrzi Username i Password i dodatne detalje, npr role
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            //  Pridodajemo request objekat -u-> authenticationToken
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            //  Postavljamo ovaj authenticationToken -u-> SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request,response);

    }


    private String getTokenFromRequest(HttpServletRequest request){

        // Izvlacimo iz Headera token, putem kljuc - vrednost para, gde nam je kljuc Authorization
        String bearerToken = request.getHeader("Authorization");
        //ako je tu token
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){   //  Da izvucemo nakon "Bearer"
            return bearerToken.substring(7, bearerToken.length());                                                                            //  dela
        }

        return null;
    }


}
