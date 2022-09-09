package com.smoothstack.common;

import com.smoothstack.common.models.User;
import com.smoothstack.common.repositories.*;
import com.smoothstack.common.services.CommonLibraryTestingService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.Optional;

@SpringBootTest
public class CommonLibraryTestingServiceTest {

    @Autowired
    CommonLibraryTestingService commonLibraryTestingService;

    //Common Library Repositories
    @Autowired
    ActiveDriverRepository activeDriverRepository;
    @Autowired
    CardRepository cardRepository;
    @Autowired
    CommunicationMethodRepository communicationMethodRepository;
    @Autowired
    DiscountRepository discountRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    MenuItemRepository menuItemRepository;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    MessageTypeRepository messageTypeRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    RestaurantTagRepository restaurantTagRepository;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserInformationRepository userInformationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRoleRepository userRoleRepository;

    @BeforeEach
    void setup() {
        commonLibraryTestingService.createTestData();
    }

    @Test
    @Transactional
    void testUserData() {
        Optional<User> testAdmin = userRepository.findTopByUserName("testAdmin");
        assert(testAdmin.isPresent());
        assert(!testAdmin.get().getUserRoles().isEmpty());
        assert(testAdmin.get().getUserInformation() != null);
        System.out.println(testAdmin.get().getUserInformation().getFirstName());

        Optional<User> testDriver = userRepository.findTopByUserName("testDriver");
        assert(testDriver.isPresent());
        assert(!testDriver.get().getUserRoles().isEmpty());
        assert(testDriver.get().getUserInformation() != null);
        System.out.println(testDriver.get().getUserInformation().getFirstName());

        Optional<User> testCustomer = userRepository.findTopByUserName("testCustomer");
        assert(testCustomer.isPresent());

    }

    @Test
    void testUserRoleData() {
        assert(userRoleRepository.findTopByRoleName("admin").isPresent());
        assert(userRoleRepository.findTopByRoleName("driver").isPresent());
    }

    @Test
    void testUserInformationByEmail() {
        assert(userInformationRepository.findTopByEmail("ben-email").isPresent());
        assert(userInformationRepository.findTopByEmail("per-email").isPresent());
        assert(userInformationRepository.findTopByEmail("roxanne-email").isPresent());
        assert(userInformationRepository.findTopByEmail("marcus-email").isPresent());
    }

    @Test
    void testMessageType() {
        assert(messageTypeRepository.findTopByName("user-confirmation").isPresent());
        assert(messageTypeRepository.findTopByName("forgot-password").isPresent());
        assert(messageTypeRepository.findTopByName("order-created").isPresent());
    }

    @Test
    void testMessageByConfirmationCode() {
        assert(messageRepository.findTopByConfirmationCode("thisIsAnExampleConfirmationCode").isPresent());
    }
}
