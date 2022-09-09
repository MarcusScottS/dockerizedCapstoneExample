package com.smoothstack.common.repositories;

import com.smoothstack.common.models.ActiveDriver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveDriverRepository extends JpaRepository<ActiveDriver, Integer> {
}