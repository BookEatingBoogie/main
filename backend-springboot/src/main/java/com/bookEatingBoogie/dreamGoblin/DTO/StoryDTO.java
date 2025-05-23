package com.bookEatingBoogie.dreamGoblin.DTO;

import com.bookEatingBoogie.dreamGoblin.model.Story;
import lombok.Data;

import java.time.LocalDateTime;

//DB에 저장된 동화 데이터를 담아두기 위한 DTO
@Data
public class StoryDTO {
    private String storyId;
    private int creationId;
    private String title;
    private LocalDateTime creationDate;
    private boolean favorite;
    private String summary;
    private String coverImg;
    private String content;
    //캐릭터 id 같이 반환.
    private int charId;

    public StoryDTO(Story s) {
        this.storyId      = s.getStoryId();
        this.creationId   = s.getCreation().getCreationId();
        this.title        = s.getTitle();
        this.creationDate = s.getCreationDate();
        this.favorite     = s.isFavorite();
        this.summary      = s.getSummary();
        this.coverImg     = s.getCoverImg();
        this.content      = s.getContent();
        // 캐릭터 ID 추출 (Story → Creation → Character)
        this.charId = s.getCreation().getCharacters().getCharId();
    }
}
