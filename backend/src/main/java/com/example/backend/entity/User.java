package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String username;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER     /* kad se ucita user, odmah ce citati i roles*/,
            cascade = CascadeType.ALL)   /* kad uradimo nesto roditelju,
                                                desava se i deci npr. cuvamo user,
                                                cuva se i roles*/

    @JoinTable(name = "users_roles",        /*Dajemo ime spojnoj tabeli*/
            joinColumns = @JoinColumn(name = "user_id", /*Ovo ce biti foreign key (FK) u spojnoj tabeli*/
                    referencedColumnName = "id"), /*odnosi se na PK u ovoj tabeli*/

            inverseJoinColumns = @JoinColumn(name = "role_id",  /*Ovo ce biti FK u spojnoj tabeli*/
                    referencedColumnName = "id")                /*Odnosi se na ime PK u Role tabeli*/
    )
    private Set<Role> roles;   //Set contains unique elements

}
