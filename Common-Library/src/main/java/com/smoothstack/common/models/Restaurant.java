package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "enabled")
    private boolean enabled = true;

    @OneToMany
    @JoinTable(name = "restaurant_review",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "review_id"))
    private List<Review> reviews;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "restaurants")
    private List<MenuItem> menuItems;

    @ManyToMany
    @JoinTable(name = "assigned_tags",
            joinColumns = @JoinColumn(name = "restaurants_id"),
            inverseJoinColumns = @JoinColumn(name = "restaurant_tag_id"))
    private List<RestaurantTag> restaurantTags;

    public void addTag(RestaurantTag restaurantTag) {
        if (restaurantTags == null)
            restaurantTags = new ArrayList<>();

        restaurantTags.add(restaurantTag);
    }
}