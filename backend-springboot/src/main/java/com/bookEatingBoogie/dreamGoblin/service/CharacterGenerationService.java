package com.bookEatingBoogie.dreamGoblin.service;

import com.bookEatingBoogie.dreamGoblin.DTO.CharacterRequestDTO;
import com.bookEatingBoogie.dreamGoblin.DTO.CharacterOutputDTO;
import com.bookEatingBoogie.dreamGoblin.DTO.CharacterReturnDTO;
import com.bookEatingBoogie.dreamGoblin.Repository.CharacterRepository;
import com.bookEatingBoogie.dreamGoblin.Repository.UserRepository;
import com.bookEatingBoogie.dreamGoblin.model.Characters;
import com.bookEatingBoogie.dreamGoblin.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;


@Service
public class CharacterGenerationService {

    RestTemplate restTemplate = new RestTemplate();

    @Value("${fastapi.baseUrl}")
    private String baseUrl;

    @Autowired
    private CharacterRepository characterRepository;
    @Autowired
    private UserRepository userRepository;

    //캐릭터 이미지를 생성 후 db에 이미지 경로를 저장하기 위한 함수
    @Transactional
    public CharacterReturnDTO generateSaveCharacter(CharacterRequestDTO request) {

        User user = userRepository.findById("user")
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        Characters characters = new Characters();
        characters.setUser(user);
        characters.setUserImg(request.getUserImg());

        if (characterRepository.existsByUserAndCharName(user, request.getCharName())) {
            throw new IllegalArgumentException("이미 같은 이름의 캐릭터가 존재합니다.");
        }
        characters.setCharName(request.getCharName());

        CharacterOutputDTO response = generateCharacter(request.getUserImg());
        // model에 charImg 경로 연결.
        characters.setCharImg(response.getS3_url());
        characters.setCharLook(response.getCharLook());
        System.out.println(characters.getCharName()+"/"+characters.getCharLook()+"/"+characters.getCharImg());
        //캐릭터 db 저장.
        saveCharacter(characters);

        CharacterReturnDTO returnDTO = new CharacterReturnDTO();
        returnDTO.setCharImg(response.getS3_url());
        returnDTO.setCharId(characters.getCharId());

        // s3 경로 반환.
        return returnDTO;
    }

    // 캐릭터 이미지 생성 함수
    private CharacterOutputDTO generateCharacter(String userImg) {

        System.out.println("▶ send to FastAPI imgUrl = " + userImg);

        //endpoint 경로 설정
        String fastAPIUrl = baseUrl + "/generate/character/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        /*
        fastAPI-generateCharacter 호출.
        생성된 캐릭터 이미지 경로(s3) 반환.
         */
        Map<String, String> body = Collections.singletonMap("imgUrl", userImg);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<CharacterOutputDTO> response = restTemplate.postForEntity(
                    fastAPIUrl, request, CharacterOutputDTO.class
            );

            // fastAPI 호출이 됐지만, 응답이 비정상적으로 반환된 경우 예외 발생.
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("FastAPI 응답 오류: 상태코드 = " + response.getStatusCode());
            }
            // 정상적으로 호출 성공.
            return response.getBody();
        } catch (RestClientException e) {
            //예외 발생 시 예외 감싸서 던짐. 요청 자체가 실패한 경우.
            throw new RuntimeException("FastAPI 캐릭터 생성 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

    private String saveCharacter(Characters character) {

        characterRepository.save(character);
        return "Success";
    }

}
