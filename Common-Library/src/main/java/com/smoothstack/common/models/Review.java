package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Convert(disableConversion = true)
    @Column(name = "time_created")
    private LocalDateTime timeCreated;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "message", length = 250)
    private String message;

    @Column(name = "enabled")
    private boolean enabled = true;
}