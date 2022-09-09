package com.smoothstack.common.repositories;

import java.util.List;

import com.smoothstack.common.models.Order;
import com.smoothstack.common.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllByCustomer(User customer);

    List<Order> findAllByDriverIsNull();
}