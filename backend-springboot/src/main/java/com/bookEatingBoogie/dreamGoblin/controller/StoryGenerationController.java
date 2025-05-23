package com.bookEatingBoogie.dreamGoblin.controller;

import com.bookEatingBoogie.dreamGoblin.DTO.IntroReturnDTO;
import com.bookEatingBoogie.dreamGoblin.DTO.IntroRequestDTO;
import com.bookEatingBoogie.dreamGoblin.DTO.StoryRequestDTO;
import com.bookEatingBoogie.dreamGoblin.DTO.StoryReturnDTO;
import com.bookEatingBoogie.dreamGoblin.service.StoryGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StoryGenerationController {

    @Autowired
    private StoryGenerationService storyGenerationService;

    private int page;
    private int charId;
    private int creationId;

    //도입부 생성 컨트롤러
    @PostMapping("/intro")
    public ResponseEntity<?> requestIntro(@RequestBody IntroRequestDTO request) {

        page = 0;

        try {
            IntroReturnDTO response = storyGenerationService.generateSaveIntro(request, "user");
            charId = request.getCharId();
            creationId = response.getCreationId();
            page++;
            //동화 도입부, 질문, 선택지, creationId, 삽화 이미지 경로 반환.
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            //응답 실패 시 예외처리.
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("도입부 생성 실패: "+e.getMessage());
        }
    }

    //중간부 및 엔딩(생성 후 정제) 생성 컨트롤러
    @PostMapping("/story")
    public ResponseEntity<?> requestStory(@RequestBody StoryRequestDTO request) {
        if (page == 0 || request.getChoice() == null) { return ResponseEntity.badRequest().build();}

        //page가 0~5사이일 경우 중간부 생성 함수 호출.
        if (page < 5 && page > 0) {
            System.out.println("page = " + page);
            try {
                StoryReturnDTO response = storyGenerationService.generateContent(request.getChoice(), page, charId,"user", creationId);
                page++;
                // 동화 중간부, 질문, 선택지, 삽화 이미지 경로 반환.
                return ResponseEntity.ok(response);
            } catch (RuntimeException e) {
                //응답 실패 시 예외처리.
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("중간부 생성 실패: " + e.getMessage());
            }
        } else if (page == 5) { //page=0이면 엔딩 생성 및 정제 함수 호출.
            System.out.println("page = " + page);
            //전체 스토리 생성.
            try {
                String contentUrl = storyGenerationService.generateSaveStory(request.getChoice(), charId, "user", creationId, page);

                return ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (RuntimeException e) {
            //응답 실패 시 예외처리.
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("동화 생성 및 정제 실패: " + e.getMessage());
            }
        }

        return null;
    }
}
