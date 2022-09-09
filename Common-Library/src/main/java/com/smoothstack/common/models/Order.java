package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "order_status", length = 45)
    private String orderStatus;

    @Column(name = "restaurant_notes", length = 250)
    private String restaurantNotes;

    @Column(name = "driver_notes", length = 250)
    private String driverNotes;

    @Column(name = "sub_total")
    private Double subTotal;

    @Column(name = "delivery_fee")
    private Double deliveryFee;

    @Column(name = "tax")
    private Double tax;

    @Column(name = "tip")
    private Double tip;

    @Column(name = "total")
    private Double total;

    @Column(name = "time_created")
    private LocalDateTime timeCreated;

    @Column(name = "scheduled_for")
    private LocalDateTime scheduledFor;

    @Column(name = "net_loyalty")
    private Integer netLoyalty;

    @Column(name = "enabled")
    private boolean enabled = true;

    @ManyToMany
    @JoinTable(name = "payment",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "payment_id"))
    private List<Card> cards;

    @ManyToOne
    @JoinTable(name = "order_driver",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "driver_id"))
    private User driver;

    @ManyToMany
    @JoinTable(name = "order_restaurant",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "restaurant_id"))
    private List<Restaurant> restaurants;

    @ManyToMany
    @JoinTable(name = "order_discount",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "discount_id"))
    private List<Discount> discounts;

    @ManyToOne
    @JoinTable(name = "customer_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "customer_id"))
    private User customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    public void addRestaurant(Restaurant restaurant) {
        if (restaurants == null)
            restaurants = new ArrayList<>();
        restaurants.add(restaurant);
    }
}