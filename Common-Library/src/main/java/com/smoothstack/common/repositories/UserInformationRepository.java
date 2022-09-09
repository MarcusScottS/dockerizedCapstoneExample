package com.smoothstack.common.repositories;

import com.smoothstack.common.models.UserInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInformationRepository extends JpaRepository<UserInformation, Integer> {
    Optional<UserInformation> findTopByEmail(String email);
}