package com.smoothstack.common.repositories;

import com.smoothstack.common.models.RestaurantTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantTagRepository extends JpaRepository<RestaurantTag, Integer> {
    Optional<RestaurantTag> findTopByName(String tagName);
}