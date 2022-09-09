package com.smoothstack.common.repositories;

import com.smoothstack.common.models.Restaurant;
import com.smoothstack.common.models.RestaurantTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>, JpaSpecificationExecutor<Restaurant> {
    // Useful only for testing as there can be multiple restaurants under the same name
    Optional<Restaurant> findTopByName(String name);
}