package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurants_id")
    private Restaurant restaurants;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "description", length = 250)
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "enabled")
    private boolean enabled = true;

    @ManyToMany
    @JoinTable(name = "menu_item_discount",
            joinColumns = @JoinColumn(name = "menu_item_id"),
            inverseJoinColumns = @JoinColumn(name = "discount_id"))
    private List<Discount> discounts;

}