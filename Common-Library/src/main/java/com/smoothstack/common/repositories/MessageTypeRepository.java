package com.smoothstack.common.repositories;

import com.smoothstack.common.models.MessageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageTypeRepository extends JpaRepository<MessageType, Integer> {
    Optional<MessageType> findTopByName(String name);
}