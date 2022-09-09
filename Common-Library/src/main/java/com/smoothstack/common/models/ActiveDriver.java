package com.smoothstack.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "active_drivers")
public class ActiveDriver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User users;

    @Convert(disableConversion = true)
    @Column(name = "time_in")
    private Instant timeIn;
}