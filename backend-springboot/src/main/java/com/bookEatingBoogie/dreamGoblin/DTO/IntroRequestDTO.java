package com.bookEatingBoogie.dreamGoblin.DTO;

import lombok.Data;

//프론트로부터 도입부 생성을 위해 입력받는 값을 받는 DTO
@Data
public class IntroRequestDTO {
    private String genre;
    private String place;
    private int charId;
}
