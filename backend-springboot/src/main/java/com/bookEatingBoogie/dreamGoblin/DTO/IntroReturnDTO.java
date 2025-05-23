package com.bookEatingBoogie.dreamGoblin.DTO;

import lombok.Data;

import java.util.List;

//생성된 동화 도입부와 삽화 url을 프론트에 전달하기 위한 DTO
@Data
public class IntroReturnDTO {
    private String story;
    private String question;
    private List<String> choices;
    private String imgUrl;
    private int creationId;
}
