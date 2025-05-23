package com.bookEatingBoogie.dreamGoblin.Repository;

import com.bookEatingBoogie.dreamGoblin.model.Style;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StyleRepository extends JpaRepository<Style, String> {

    Optional<Style> findByStyle(String style);

    Style getStyleByStyle(String style);
}
