package com.bookEatingBoogie.dreamGoblin.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "characters")
public class Characters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "charID")
    private int charId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @Column(name = "charName", length = 50)
    private String charName;

    @Column(name = "charNote", columnDefinition = "TEXT")
    private String charNote;

    @Column(name = "charLook", columnDefinition = "TEXT")
    private String charLook;

    @Column(name = "userImg")
    private String userImg;

    @Column(name = "charImg")
    private String charImg;
}
