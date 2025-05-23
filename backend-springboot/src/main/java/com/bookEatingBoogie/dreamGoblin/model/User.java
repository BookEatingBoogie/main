package com.bookEatingBoogie.dreamGoblin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "userID", length = 50)
    private String userId;

    @Column(name = "passwd", nullable = false, length = 50)
    private String password;

    @Column(name = "userName", nullable = false, length = 50)
    private String userName;

    @Column(name = "phoneNum", nullable = false, length = 11)
    private String phoneNum;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Characters> characters;
}
