package com.bookEatingBoogie.dreamGoblin.DTO;

import com.bookEatingBoogie.dreamGoblin.model.Characters;
import lombok.Data;

//캐릭터 DTO
@Data
public class CharacterDTO {
    private int charId;
    private String userId;
    private String charName;
    private String charNote;
    private String charLook;
    private String userImg;
    private String charImg;

    public CharacterDTO(Characters c) {
        this.charId   = c.getCharId();
        this.userId   = c.getUser().getUserId();
        this.charName = c.getCharName();
        this.charNote = c.getCharNote();
        this.charLook = c.getCharLook();
        this.userImg  = c.getUserImg();
        this.charImg  = c.getCharImg();
    }
}
