package com.example.backend.configuration;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@AllArgsConstructor
public class SpringSecurityConfiguration {

    //  U Spring Security 6 ne moramo da explicitno navodimo UserDetailsService jer ce ga
    //  AuthenticationManager sam povuci
    private UserDetailsService userDetailsService; //Ubacujemo interfejs da injektiramo dependency

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /*
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http.csrf().disable()            // <-- Ovo disable-ujemo jer nam stvara nepotrebne komplikacije (bar dok se uci)
                .authorizeHttpRequests((authorize)-> {
                    authorize.anyRequest().authenticated();            //  Ovo odobravamo sve za pocetak
                }).httpBasic(Customizer.withDefaults());

        return http.build();

    }
    */


    //  OVO SVE MOZE I SA METHOD LEVEL SECURITY @
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests((authorize) -> {
                    authorize.requestMatchers("/register").permitAll();
                    authorize.requestMatchers("/sign-in").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "/**").hasRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.PUT, "/**").hasRole("ADMIN");
                    authorize.requestMatchers(HttpMethod.DELETE, "/**").hasRole("ADMIN");
                    //authorize.requestMatchers(HttpMethod.GET, "/**").hasAnyRole("ADMIN", "USER");
                    authorize.requestMatchers(HttpMethod.GET, "/**").permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * POSTO KORISTIMO DB AUTENTIFIKACIJU, KOMENTARISEMO OVAJ DEO
     @Bean
     public UserDetailsService userDetailsService(){

     UserDetails marko = User.builder()
     .username("marko")
     .password(passwordEncoder().encode("password"))
     .roles("USER")
     .build();

     UserDetails jovan = User.builder()
     .username("jovan")
     .password(passwordEncoder().encode("sifra"))
     .roles("ADMIN")
     .build();

     return new InMemoryUserDetailsManager(marko, jovan);    // CUVAMO PODATKE U MEMORY OBJECT-U

     }
     */

}