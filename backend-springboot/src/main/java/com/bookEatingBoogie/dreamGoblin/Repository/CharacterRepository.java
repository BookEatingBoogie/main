package com.bookEatingBoogie.dreamGoblin.Repository;

import com.bookEatingBoogie.dreamGoblin.model.Characters;
import com.bookEatingBoogie.dreamGoblin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Characters, Integer> {

    Optional<Characters> findByCharId(Integer charId);

    boolean existsByUserAndCharName(User user, String charName);

    Optional<Characters> findByCharIdAndUser(int charId, User user);

    List<Characters> findByUser(User user);
}
