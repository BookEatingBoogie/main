package com.bookEatingBoogie.dreamGoblin.service;

import com.bookEatingBoogie.dreamGoblin.DTO.*;
import com.bookEatingBoogie.dreamGoblin.Repository.*;
import com.bookEatingBoogie.dreamGoblin.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class StoryGenerationService {

    RestTemplate restTemplate = new RestTemplate();

    @Value("${fastapi.baseUrl}")
    private String baseUrl;

    @Autowired
    private CreationRepository creationRepository;
    @Autowired
    private CharacterRepository characterRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private StyleRepository styleRepository;

    private final List<String> storyList = new ArrayList<>();
    private String requestId;


    //동화 도입부 생성 및 db에 장르, 배경을 저장하기 위한 함수
    public IntroReturnDTO generateSaveIntro(IntroRequestDTO storyRequest, String userId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        Characters characters = characterRepository.findByCharIdAndUser(storyRequest.getCharId(),user)
                .orElseThrow(() -> new IllegalArgumentException("해당 캐릭터가 존재하지 않거나 사용자의 캐릭터가 아닙니다."));
        Style genre = styleRepository.findById(storyRequest.getGenre())
                .orElseThrow(() -> new IllegalArgumentException("해당 장르가 존재하지 않습니다."));
        Style place = styleRepository.findById(storyRequest.getPlace())
                .orElseThrow(() -> new IllegalArgumentException("해당 배경이 존재하지 않습니다."));

        Creation creation = new Creation();
        //creation model에 넣기.
        creation.setCharacters(characters);
        creation.setGenre(genre);
        creation.setPlace(place);

        //fast api로 전송할 값 dto에 넣기
        IntroInfoDTO storyInfo = new IntroInfoDTO();
        storyInfo.setCharName(characters.getCharName());
        storyInfo.setGenre(storyRequest.getGenre());
        storyInfo.setPlace(storyRequest.getPlace());
        storyInfo.setImgUrl(characters.getUserImg());
        storyInfo.setCharLook(characters.getCharLook());

        //동화 도입부 생성 요청.
        IntroOutputDTO response = generateIntro(storyInfo);
        System.out.println(response);

        //creation db에 캐릭터 id,장르, 배경 저장.
        int creationId = saveCreation(creation);

        //동화 내용 저장.
        storyList.add(response.getIntro());

        //returnDTO에 내용 저장.
        IntroReturnDTO returnDTO = new IntroReturnDTO();
        returnDTO.setCreationId(creationId);
        returnDTO.setStory(response.getIntro());
        returnDTO.setQuestion(response.getQuestion());
        returnDTO.setChoices(response.getOptions());
        returnDTO.setImgUrl(response.getS3_url());

        requestId = response.getRequestId();
        System.out.println(requestId);

        return returnDTO;
    }
    // 엔딩 생성 및 전체 스토리 정제.
    public String generateSaveStory(String choice, int charId, String userId, int creationId, int page) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        Characters characters = characterRepository.findByCharIdAndUser(charId,user)
                .orElseThrow(() -> new IllegalArgumentException("해당 캐릭터가 존재하지 않거나 사용자의 캐릭터가 아닙니다."));
        Creation creation = creationRepository.findByCreationIdAndCharacters(creationId,characters)
                .orElseThrow(() -> new IllegalArgumentException("생성되지 않은 동화입니다."));
        // 스토리 id 생성. - 스토리를 creation과 연결.
        Story story = new Story();
        story.setCreation(creation);
        storyRepository.save(story);

        String response = generateStory(choice, story.getStoryId(), page, characters);
        storyList.clear();

        story.setContent(response);
        storyRepository.save(story);

        return response;
    }

    //도입부 생성 함수
    private IntroOutputDTO generateIntro(IntroInfoDTO storyInfo) {

        //endpoint 경로 설정.
        String fastAPIUrl = baseUrl + "/generate/intro/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        /*
        fastAPI-generateStory 호출.
        스토리 생성을 위한 장르, 배경, 캐릭터이름 전달, 생성된 동화 내용 반환.
         */
        HttpEntity<IntroInfoDTO> request = new HttpEntity<>(storyInfo, headers);

        try {
            ResponseEntity<IntroOutputDTO> response = restTemplate.exchange(
                    fastAPIUrl,
                    HttpMethod.POST,
                    request,
                    IntroOutputDTO.class
            );

            // fastAPI 호출이 됐지만, 응답이 비정상적으로 반환된 경우
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("FastAPI 응답 오류: 상태코드 = " + response.getStatusCode());
            }

            return response.getBody();

        } catch (RestClientException e) {
            //예외 발생 시 예외 감싸서 던짐. 요청 자체가 실패한 경우.
            throw new RuntimeException("FastAPI 동화 생성 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

    //엔딩 생성 및 동화 정제 함수
    private String generateStory(String choice, String storyId, int page, Characters characters) {
        //endpoint 경로 설정.
        String fastAPIUrl = baseUrl + "/generate/story/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String,Object> storyInfo = Map.of(
                "requestId", requestId,
                "page", page,
                "storyId", storyId,
                "charName", characters.getCharName(),
                "choice", choice,
                "story", storyList,
                "imgUrl", characters.getUserImg()
        );
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(storyInfo, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    fastAPIUrl,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            // fastAPI 호출이 됐지만, 응답이 비정상적으로 반환된 경우
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("FastAPI 응답 오류: 상태코드 = " + response.getStatusCode());
            }

            return response.getBody();

        } catch (RestClientException e) {
            //예외 발생 시 예외 감싸서 던짐. 요청 자체가 실패한 경우.
            throw new RuntimeException("FastAPI 동화 생성 및 정제 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

    //동화 중간부분 생성.
    public StoryReturnDTO generateContent(String choice, int page, int charId, String userId, int creationId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        Characters characters = characterRepository.findByCharIdAndUser(charId,user)
                .orElseThrow(() -> new IllegalArgumentException("해당 캐릭터가 존재하지 않거나 사용자의 캐릭터가 아닙니다."));
        Creation creation = creationRepository.findByCreationIdAndCharacters(creationId,characters)
                .orElseThrow(() -> new IllegalArgumentException("생성되지 않은 동화입니다."));

        //endpoint 경로 설정.
        String fastAPIUrl = baseUrl + "/generate/content/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        /*
        fastAPI-generateContent 호출.
        스토리 생성을 위한 장르, 배경, 캐릭터이름 전달, 생성된 동화 내용 반환.
         */
        System.out.println(requestId);
        Map<String,Object> storyInfo = Map.of(
                "requestId", requestId,
                "charName", characters.getCharName(),
                "choice", choice,
                "page", page,
                "imgUrl", characters.getUserImg()
        );
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(storyInfo, headers);

        try {
            ResponseEntity<StoryReturnDTO> response = restTemplate.exchange(
                    fastAPIUrl,
                    HttpMethod.POST,
                    request,
                    StoryReturnDTO.class
            );

            // fastAPI 호출이 됐지만, 응답이 비정상적으로 반환된 경우
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("FastAPI 응답 오류: 상태코드 = " + response.getStatusCode());
            }

            storyList.add(response.getBody().getStory());
            System.out.println(response.getBody());
            requestId = response.getBody().getRequestId();
            System.out.println(requestId);

            System.out.println("호출 완료.");

            return response.getBody();

        } catch (RestClientException e) {
            //예외 발생 시 예외 감싸서 던짐. 요청 자체가 실패한 경우.
            throw new RuntimeException("FastAPI 동화 생성 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

    private int saveCreation(Creation creation) {
        creationRepository.save(creation);
        return creation.getCreationId();
    }
}
