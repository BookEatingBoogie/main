package com.bookEatingBoogie.dreamGoblin.DTO;

import lombok.Data;

//캐릭터 생성을 위한 프론트 요청 시 요청 파라미터를 받는 DTO
@Data
public class CharacterRequestDTO {
    private String charName;
    private String userImg;
}
