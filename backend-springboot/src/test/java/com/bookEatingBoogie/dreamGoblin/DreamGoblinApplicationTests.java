package com.bookEatingBoogie.dreamGoblin;

import com.bookEatingBoogie.dreamGoblin.Repository.CharacterRepository;
import com.bookEatingBoogie.dreamGoblin.Repository.CreationRepository;
import com.bookEatingBoogie.dreamGoblin.Repository.StoryRepository;
import com.bookEatingBoogie.dreamGoblin.Repository.UserRepository;
import com.bookEatingBoogie.dreamGoblin.model.Characters;
import com.bookEatingBoogie.dreamGoblin.model.Creation;
import com.bookEatingBoogie.dreamGoblin.model.Story;
import com.bookEatingBoogie.dreamGoblin.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.internal.matchers.text.ValuePrinter.print;

@SpringBootTest
@ActiveProfiles("test")
class StoryRepositoryTest {

	@Autowired
	private StoryRepository storyRepository;

	@Autowired
	private CreationRepository creationRepository;

	@Autowired
	private CharacterRepository characterRepository;
    @Autowired
    private UserRepository userRepository;

	@Test
	void testStorySave_withPrePersistIdGeneration() {
		// 1. User 생성 및 저장
		User user = new User();
		user.setUserId("testUser");
		user.setPassword("1234");
		user.setUserName("테스트유저");
		user.setPhoneNum("01012345678");
		userRepository.save(user);

		// 1. Characters 생성 및 저장
		Characters character = new Characters();
		character.setCharName("테스트캐릭터");
		character.setUserImg("https://image.url");
		character.setCharLook("기본표정");
		character.setUser(user);
		characterRepository.save(character);

		// 2. Creation 생성 및 Characters 설정
		Creation creation = new Creation();
		creation.setCharacters(character);  // ✅ 꼭 설정해야 함
		creationRepository.save(creation);

		// 3. Story 생성 및 저장
		Story story = new Story();
		story.setCreation(creation);  // 관계 연결
		storyRepository.save(story);
		print(story.getStoryId());

		String text = "test text";
		story.setContent(text);
		storyRepository.save(story);
		print(story.getStoryId());
		storyRepository.flush();

		assertNotNull(story.getStoryId());
		assertTrue(storyRepository.existsById(story.getStoryId()));
	}

}
