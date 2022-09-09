package com.smoothstack.common.repositories;

import com.smoothstack.common.models.CommunicationMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunicationMethodRepository extends JpaRepository<CommunicationMethod, Integer> {
}