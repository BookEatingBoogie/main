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
@Table(name = "creation")
public class Creation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "creationID")
    private int creationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "charID", nullable = false)
    private Characters characters;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre", referencedColumnName = "style")
    private Style genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place", referencedColumnName = "style")
    private Style place;

    @OneToOne(mappedBy = "creation", cascade = CascadeType.ALL)
    private Story story;
}
