package com.bookEatingBoogie.dreamGoblin.Repository;

import com.bookEatingBoogie.dreamGoblin.model.Characters;
import com.bookEatingBoogie.dreamGoblin.model.Creation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreationRepository extends JpaRepository<Creation, Integer> {

    Optional<Creation> findByCreationId(int creationId);

    Optional<Creation> findByCreationIdAndCharacters(int creationId, Characters characters);

    boolean existsByCharacters(Characters characters);
}
