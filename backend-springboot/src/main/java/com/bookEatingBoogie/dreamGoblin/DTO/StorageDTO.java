package com.bookEatingBoogie.dreamGoblin.DTO;

import com.bookEatingBoogie.dreamGoblin.model.Characters;
import com.bookEatingBoogie.dreamGoblin.model.Story;
import lombok.Data;

import java.util.List;

//DB에 저장된 동화 및 캐릭터 정보를 한번에 반환하기 위한 DTO
@Data
public class StorageDTO {
    private List<StoryDTO> stories;
    private List<CharacterDTO> characters;

    public StorageDTO(List<StoryDTO> stories, List<CharacterDTO> characters) {
        this.stories = stories;
        this.characters = characters;
    }
}
