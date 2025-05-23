package com.bookEatingBoogie.dreamGoblin.Repository;

import com.bookEatingBoogie.dreamGoblin.model.Creation;
import com.bookEatingBoogie.dreamGoblin.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, String> {

    Optional<Story> findByStoryId(String storyId);

//        AND s.title           IS NOT NULL
//        AND s.coverImg        IS NOT NULL
    @Query("""
    SELECT DISTINCT s
      FROM Story s
      JOIN FETCH s.creation c
      JOIN FETCH c.characters ch
      JOIN FETCH ch.user u
     WHERE u.userId = :userId
        AND s.content         IS NOT NULL
    """)
    List<Story> findAllByUserIdWithCharacters(@Param("userId") String userId);

    @Query("""
    SELECT s FROM Story s
    WHERE s.creation.characters.user.userId = :userId
    ORDER BY s.storyId DESC
    LIMIT 1
    """)
    Optional<Story> findLatestStoryByUserId(@Param("userId") String userId);

    @Query("""
    SELECT s FROM Story s
    JOIN FETCH s.creation c
    JOIN FETCH c.characters ch
    JOIN FETCH ch.user u
    WHERE s.storyId = :storyId
    """)
    Optional<Story> findByStoryIdWithAllRelations(@Param("storyId") String storyId);

    boolean existsByCreation(Creation creation);

    @Modifying
    @Transactional
    @Query("DELETE FROM Story s WHERE s.storyId = :storyId")
    void deleteByStoryId(@Param("storyId") String storyId);
}
