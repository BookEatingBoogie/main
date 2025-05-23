package com.bookEatingBoogie.dreamGoblin.DTO;

import lombok.Data;

//fastApi로부터 캐릭터 생성 요청 후 반환값을 받는 DTO
@Data
public class CharacterOutputDTO {
    private String s3_url;
    private String charLook;
}
