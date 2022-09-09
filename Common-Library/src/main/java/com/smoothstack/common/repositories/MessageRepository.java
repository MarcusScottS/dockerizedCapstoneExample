package com.smoothstack.common.repositories;

import com.smoothstack.common.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    Optional<Message> findTopByConfirmationCode(String confirmationCode);
}