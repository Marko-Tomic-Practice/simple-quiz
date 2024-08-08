package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

//import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    //  Generate JWT token
    public String generateToken(Authentication authentication) {

        //  Dobijamo Username ili Email koji cemo "tokenizovati"
        String username = authentication.getName();

        //  Definisemo vremena, treba nam da znamo koliko dugo ce vaziti token
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        //  "Gradimo" token, doduse metode su *deprecated u Spring Security 6 - dobre stvari ne treba menjati :(
        String token = Jwts.builder()
                .setSubject(username)           // sub - Subject
                //                     <---------- sta ce nam sve biti u payloadu, pogledati Claim names
                                                // iss - Issuer
                                                // aud - Audience
                                                // itd... ima ih gomila

                .setIssuedAt(new Date())        // iat - Issued At
                .setExpiration(expireDate)      // exp - Expiration Time
                .signWith(key())                // Sa cim cemo potpisati -
                                                // "Signature"  var signature = hashAlg(str, secret)
                                                // var str = base64Encode(header) + "." + base64Encode(payload)
                .compact();                     // Upakuj ga majstore

        return token;                           // Vrati generisani token
    }

    //  Pravimo kljuc sa kojim cemo izvrsiti 'signature'
    //  Ovde dekodiramo vec enkodiran kljuc jer Indijac voli da jebe dok nas uci - i hvala mu na tome
    private Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }

    /**
     * Change this:
     *
     * Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
     *
     * For that:
     *
     * Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt);
     */

    //  Get username from JWT token
    public String getUsername(String token) {
        Claims claims = Jwts.parser()       //  Parcamo JWT da izvucemo sta nam treba
                .setSigningKey(key())       //  Treba nam signature da "otkljucamo" JWT
                .build()                    //  Dobijamo prevedeni JWT objekat
                .parseClaimsJws(token)
                .getBody();                 //  Vadimo telo (claims) iz tokena, pretpostavljam iz payload dela
                /*
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getBody();*/

        String username = claims.getSubject();  // Uzimamo Subject sto nam je username u sustini

        return username;
    }

    //  Validate JWT Token
    public boolean validateToken(String token){ //  Vrsimo validaciju tokena, da proverimo da nije doslo do neke izmene
                                                //  radi autenticnosti podataka i bolje zastite
        Jwts.parser()
                .setSigningKey(key())
                .build()
                .parse(token);
        return true;
    }
}
