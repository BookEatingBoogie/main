package com.bookEatingBoogie.dreamGoblin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "style")
public class Style {

    @Id
    @Column(name = "style", length = 30)
    private String style;

    @Column(name = "styleType", length = 30)
    private String styleType;

    @Column(name = "prompt", columnDefinition = "TEXT")
    private String prompt;
}
