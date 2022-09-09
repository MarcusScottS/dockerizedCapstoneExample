package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_name", length = 45)
    private String userName;

    @Column(name = "password", length = 45)
    private String password;

    @Column(name = "enabled")
    private boolean enabled = true;

    @ManyToMany()
    @JoinTable(name = "assigned_roles",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<UserRole> userRoles;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user", optional = false)
    @PrimaryKeyJoinColumn
    private UserInformation userInformation;

    @OneToMany
    @JoinTable(name = "driver_review",
            joinColumns = @JoinColumn(name = "driver_id"),
            inverseJoinColumns = @JoinColumn(name = "review_id"))
    private List<Review> reviews;

    @OneToMany
    @JoinTable(name = "saved_card",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "card_id"))
    private List<Card> savedCards;

    @OneToMany
    @JoinTable(name = "saved_locations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id"))
    private List<Location> savedLocations;

    public void addRole(UserRole toAdd) {
        if (userRoles == null)
            userRoles = new ArrayList<>();

        userRoles.add(toAdd);
    }
}