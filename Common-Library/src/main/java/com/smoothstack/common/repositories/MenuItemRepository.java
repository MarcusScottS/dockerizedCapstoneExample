package com.smoothstack.common.repositories;

import java.util.List;
import java.util.Optional;

import com.smoothstack.common.models.MenuItem;
import com.smoothstack.common.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer>, JpaSpecificationExecutor<MenuItem> {
    List<MenuItem> findAllByRestaurants(Restaurant restaurants);
    // Useful only for testing as there can be multiple menu items under the same name
    Optional<MenuItem> findTopByName(String name);
}