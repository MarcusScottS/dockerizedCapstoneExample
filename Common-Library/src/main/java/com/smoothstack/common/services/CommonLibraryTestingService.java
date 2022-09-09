/*
* Benjamin Schroeder
*
* This service is meant for populating an H2 database with generic test data for ease of testing in microservices using
* the Common Library. This code should never be accessible to a user or used on a mySQL table as the test users would
* pose a security risk.
 */
package com.smoothstack.common.services;

import com.smoothstack.common.models.*;
import com.smoothstack.common.models.MenuItem;
import com.smoothstack.common.repositories.*;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CommonLibraryTestingService {
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

    //Creates a set of test data within the active repository
    public void createTestData() {
        createUserTestData();
        createRestaurantTestData();
        createOrderTestData();
        createMessageTestData();
    }

    private void createDiscountTestData() {
        //TODO When ready for discounts to be implemented
    }

    private void createMessageTestData() {
        // Test Communication Methods

        CommunicationMethod sms = new CommunicationMethod();
        sms.setId(0);
        sms.setName("sms");
        sms = communicationMethodRepository.save(sms);

        CommunicationMethod email = new CommunicationMethod();
        email.setName("email");
        email = communicationMethodRepository.save(email);

        communicationMethodRepository.flush();

        // Test Message Types

        MessageType userConfirmation = new MessageType();
        userConfirmation.setName("user-confirmation");
        userConfirmation = messageTypeRepository.save(userConfirmation);

        MessageType forgotPassword = new MessageType();
        forgotPassword.setName("forgot-password");
        forgotPassword = messageTypeRepository.save(forgotPassword);

        MessageType orderCreated = new MessageType();
        orderCreated.setName("order-created");
        orderCreated = messageTypeRepository.save(orderCreated);

        messageTypeRepository.flush();

        //Test Messages

        Message userConfirmationMessage = new Message();
        userConfirmationMessage.setType(userConfirmation);
        userConfirmationMessage.setCommunicationType(email);
        userConfirmationMessage.setConfirmationCode("thisIsAnExampleConfirmationCode");
        messageRepository.save(userConfirmationMessage);
    }

    private void createOrderTestData() {
        // Test Order 1

        Order testOrder1 = new Order();

        testOrder1.setOrderStatus("delivered");

        Optional<User> testOrder1Customer = userRepository.findTopByUserName("testCustomer");
        if (testOrder1Customer.isPresent())
            testOrder1.setCustomer(testOrder1Customer.get());

        Optional<User> testOrder1Driver = userRepository.findTopByUserName("testDriver");
        if (testOrder1Driver.isPresent())
            testOrder1.setDriver(testOrder1Driver.get());

        Optional<Restaurant> testOrder1Restaurant = restaurantRepository.findTopByName("Dublin Bay Irish Pub & Grill");
        if (testOrder1Restaurant.isPresent())
            testOrder1.addRestaurant(testOrder1Restaurant.get());

        testOrder1 = orderRepository.saveAndFlush(testOrder1);

        // Order 1 Test Items

        List<OrderItem> order1Items = new ArrayList<>();

        OrderItem order1Item = new OrderItem();
        order1Item.setOrder(testOrder1);
        Optional<MenuItem> order1MenuItem = menuItemRepository.findTopByName("Apple Berry Salad");
        if (order1MenuItem.isPresent()) {
            order1Item.setMenuItems(order1MenuItem.get());
            order1Item.setPrice(order1MenuItem.get().getPrice());
        }
        order1Items.add(order1Item);

        order1Item = new OrderItem();
        order1Item.setOrder(testOrder1);
        order1MenuItem = menuItemRepository.findTopByName("Buffalo Chicken Sandwich");
        if (order1MenuItem.isPresent()) {
            order1Item.setMenuItems(order1MenuItem.get());
            order1Item.setPrice(order1MenuItem.get().getPrice());
        }
        order1Items.add(order1Item);

        testOrder1.setOrderItems(order1Items);

        double totalPrice = 0;
        for (OrderItem orderItem: order1Items)
            totalPrice += orderItem.getPrice();
        double tax = Math.round(totalPrice * 0.06 * 100) / 100.0;

        testOrder1.setSubTotal(totalPrice);
        testOrder1.setTax(tax);
        testOrder1.setTotal(totalPrice + tax);
        testOrder1 = orderRepository.saveAndFlush(testOrder1);

        // Test Order 2

        Order testOrder2 = new Order();

        Optional<User> testOrder2Customer = userRepository.findTopByUserName("testCustomer");
        if (testOrder2Customer.isPresent())
            testOrder2.setCustomer(testOrder2Customer.get());

        Optional<User> testOrder2Driver = userRepository.findTopByUserName("testDriver");
        if (testOrder2Driver.isPresent())
            testOrder2.setDriver(testOrder2Driver.get());

        Optional<Restaurant> testOrder2Restaurant = restaurantRepository.findTopByName("Tropical Smoothie Cafe");
        if (testOrder2Restaurant.isPresent())
            testOrder2.addRestaurant(testOrder2Restaurant.get());

        testOrder2 = orderRepository.saveAndFlush(testOrder2);

        // Order 2 Test Items

        List<OrderItem> order2Items = new ArrayList<>();

        OrderItem order2Item = new OrderItem();
        order2Item.setOrder(testOrder2);
        Optional<MenuItem> order2MenuItem = menuItemRepository.findTopByName("Peanut Butter Cup Smoothie");
        if (order2MenuItem.isPresent()) {
            order2Item.setMenuItems(order2MenuItem.get());
            order2Item.setPrice(order2MenuItem.get().getPrice());
        }
        order2Items.add(order2Item);

        order2Item = new OrderItem();
        order2Item.setOrder(testOrder2);
        order2MenuItem = menuItemRepository.findTopByName("Peanut Butter Banana Crunch Flatbread");
        if (order2MenuItem.isPresent()) {
            order2Item.setMenuItems(order2MenuItem.get());
            order2Item.setPrice(order2MenuItem.get().getPrice());
        }
        order2Items.add(order2Item);

        testOrder2.setOrderItems(order2Items);

        totalPrice = 0;
        for (OrderItem orderItem: order2Items)
            totalPrice += orderItem.getPrice();
        tax = Math.round(totalPrice * 0.06 * 100) / 100.0;

        testOrder2.setSubTotal(totalPrice);
        testOrder2.setTax(tax);
        testOrder2.setTotal(totalPrice + tax);
        testOrder2 = orderRepository.saveAndFlush(testOrder2);

        // TODO ADD ADDITIONAL TESTS FOR IN PROGRESS ORDERS AND MULTIPLE RESTAURANTS
    }

    private void createRestaurantTestData() {
        //Noodles & Co
        RestaurantTag pastaTag = new RestaurantTag();
        pastaTag.setName("Pasta(Test)");
        pastaTag = restaurantTagRepository.save(pastaTag);

        RestaurantTag dietFriendlyTag = new RestaurantTag();
        dietFriendlyTag.setName("Diet Friendly(Test)");
        dietFriendlyTag =  restaurantTagRepository.save(dietFriendlyTag);

        restaurantTagRepository.flush();

        Restaurant noodlesAndCo = new Restaurant();
        noodlesAndCo.setName("Noodles & Company");
        noodlesAndCo.addTag(pastaTag);
        noodlesAndCo.addTag(dietFriendlyTag);

        Location noodlesLocation = new Location();
        noodlesLocation.setAddress("400 S Duff Ave");
        noodlesLocation.setCity("Ames");
        noodlesLocation.setState("Iowa");
        noodlesLocation.setZipCode(50010);
        noodlesLocation  = locationRepository.saveAndFlush(noodlesLocation);

        noodlesAndCo.setLocation(noodlesLocation);

        Optional<User> noodlesOwner = userRepository.findTopByUserName("testAdmin");
        if (noodlesOwner.isPresent())
            noodlesAndCo.setOwner(noodlesOwner.get());

        noodlesAndCo = restaurantRepository.saveAndFlush(noodlesAndCo);

        List<MenuItem> noodlesMenu = new ArrayList<>();

        MenuItem noodlesMenuItem = new MenuItem();
        noodlesMenuItem.setRestaurants(noodlesAndCo);
        noodlesMenuItem.setName("Wisconsin Mac & Cheese");
        noodlesMenuItem.setDescription("A classic blend of cheddar and jack cheeses, cream and elbow macaroni");
        noodlesMenuItem.setPrice(7.61);
        noodlesMenu.add(noodlesMenuItem);

        noodlesMenuItem = new MenuItem();
        noodlesMenuItem.setRestaurants(noodlesAndCo);
        noodlesMenuItem.setName("Pad Thai");
        noodlesMenuItem.setDescription("Rice noodle stir-fry with scrambled egg, napa and red cabbage topped with peanuts, green onions, cilantro and a lime wedge. Try with sautéed shrimp.");
        noodlesMenuItem.setPrice(7.88);
        noodlesMenu.add(noodlesMenuItem);

        noodlesMenuItem = new MenuItem();
        noodlesMenuItem.setRestaurants(noodlesAndCo);
        noodlesMenuItem.setName("Zucchini Pesto With Grilled Chicken");
        noodlesMenuItem.setDescription("Zucchini noodles with basil pesto cream sauce, garlic, grilled chicken, mushrooms, tomato and parmesan.");
        noodlesMenuItem.setPrice(8.66);
        noodlesMenu.add(noodlesMenuItem);

        noodlesMenuItem = new MenuItem();
        noodlesMenuItem.setRestaurants(noodlesAndCo);
        noodlesMenuItem.setName("Roasted Garlic Cream Tortelloni");
        noodlesMenuItem.setDescription("Cheese-filled tortelloni in light roasted garlic & onion cream sauce with zucchini, mushrooms and spinach finished with MontAmoré cheese and parsley.");
        noodlesMenuItem.setPrice(9.19);
        noodlesMenu.add(noodlesMenuItem);

        noodlesMenuItem = new MenuItem();
        noodlesMenuItem.setRestaurants(noodlesAndCo);
        noodlesMenuItem.setName("Spaghetti & Meatballs");
        noodlesMenuItem.setDescription("Spaghetti noodles and oven-roasted meatballs in crushed tomato marinara topped with parmesan.");
        noodlesMenuItem.setPrice(7.09);
        noodlesMenu.add(noodlesMenuItem);

        menuItemRepository.saveAllAndFlush(noodlesMenu);

        //Tropical Smoothie Cafe

        RestaurantTag drinksTag = new RestaurantTag();
        drinksTag.setName("Drinks(Test)");
        drinksTag = restaurantTagRepository.save(drinksTag);

        RestaurantTag breakfastTag = new RestaurantTag();
        breakfastTag.setName("Breakfast(Test)");
        breakfastTag = restaurantTagRepository.save(breakfastTag);

        restaurantTagRepository.flush();

        Restaurant tropicalSmoothieCafe = new Restaurant();
        tropicalSmoothieCafe.setName("Tropical Smoothie Cafe");
        tropicalSmoothieCafe.addTag(breakfastTag);
        tropicalSmoothieCafe.addTag(drinksTag);

        Location tropicalSmoothieLocation = new Location();
        tropicalSmoothieLocation.setAddress("517 Lincoln Way");
        tropicalSmoothieLocation.setCity("Ames");
        tropicalSmoothieLocation.setState("Iowa");
        tropicalSmoothieLocation.setZipCode(50010);
        tropicalSmoothieLocation =  locationRepository.saveAndFlush(tropicalSmoothieLocation);

        tropicalSmoothieCafe.setLocation(tropicalSmoothieLocation);

        Optional<User> tropicalSmoothieOwner = userRepository.findTopByUserName("testAdmin");
        if (tropicalSmoothieOwner.isPresent())
            tropicalSmoothieCafe.setOwner(tropicalSmoothieOwner.get());

        tropicalSmoothieCafe = restaurantRepository.saveAndFlush(tropicalSmoothieCafe);

        List<MenuItem> tropicalMenuItems = new ArrayList<>();

        MenuItem tropicalMenuItem = new MenuItem();
        tropicalMenuItem.setRestaurants(tropicalSmoothieCafe);
        tropicalMenuItem.setName("Peanut Butter Banana Crunch Flatbread");
        tropicalMenuItem.setDescription("Peanut butter, banana, granola & honey (590 cal)");
        tropicalMenuItem.setPrice(5.99);
        tropicalMenuItems.add(tropicalMenuItem);

        tropicalMenuItem = new MenuItem();
        tropicalMenuItem.setRestaurants(tropicalSmoothieCafe);
        tropicalMenuItem.setName("All American Wrap");
        tropicalMenuItem.setDescription("Eggs, ham, bacon, cheddar & mozzarella (430 cal)");
        tropicalMenuItem.setPrice(5.99);
        tropicalMenuItems.add(tropicalMenuItem);

        tropicalMenuItem = new MenuItem();
        tropicalMenuItem.setRestaurants(tropicalSmoothieCafe);
        tropicalMenuItem.setName("Mango Magic Smoothie");
        tropicalMenuItem.setDescription("Mango, pineapple & non-fat yogurt (400 cal)");
        tropicalMenuItem.setPrice(5.75);
        tropicalMenuItems.add(tropicalMenuItem);

        tropicalMenuItem = new MenuItem();
        tropicalMenuItem.setRestaurants(tropicalSmoothieCafe);
        tropicalMenuItem.setName("Blimey Limey Smoothie");
        tropicalMenuItem.setDescription("Strawberries, pineapple, orange juice & lime (440 cal)");
        tropicalMenuItem.setPrice(5.75);
        tropicalMenuItems.add(tropicalMenuItem);

        tropicalMenuItem = new MenuItem();
        tropicalMenuItem.setRestaurants(tropicalSmoothieCafe);
        tropicalMenuItem.setName("Peanut Butter Cup Smoothie");
        tropicalMenuItem.setDescription("Peanut butter, banana & chocolate (710 cal)");
        tropicalMenuItem.setPrice(6.35);
        tropicalMenuItems.add(tropicalMenuItem);

        menuItemRepository.saveAllAndFlush(tropicalMenuItems);

        // Dublin Bay

        RestaurantTag barFoodTag = new RestaurantTag();
        barFoodTag.setName("Bar Food(Test)");
        barFoodTag = restaurantTagRepository.save(barFoodTag);

        RestaurantTag irishTag = new RestaurantTag();
        irishTag.setName("Irish(Test)");
        irishTag = restaurantTagRepository.save(irishTag);

        restaurantTagRepository.flush();

        Restaurant dublinBay = new Restaurant();
        dublinBay.setName("Dublin Bay Irish Pub & Grill");
        dublinBay.addTag(barFoodTag);
        dublinBay.addTag(irishTag);

        Location dublinBayLocation = new Location();
        dublinBayLocation.setAddress("320 S 16th St");
        dublinBayLocation.setCity("Ames");
        dublinBayLocation.setState("Iowa");
        dublinBayLocation.setZipCode(50010);
        dublinBayLocation = locationRepository.save(dublinBayLocation);

        dublinBay.setLocation(dublinBayLocation);

        Optional<User> dublinBayOwner = userRepository.findTopByUserName("testDriver");
        if (dublinBayOwner.isPresent())
            dublinBay.setOwner(dublinBayOwner.get());

        dublinBay = restaurantRepository.saveAndFlush(dublinBay);

        List<MenuItem> dublinBayMenu = new ArrayList<>();

        MenuItem dublinBayMenuItem = new MenuItem();
        dublinBayMenuItem.setRestaurants(dublinBay);
        dublinBayMenuItem.setName("Apple Berry Salad");
        dublinBayMenuItem.setDescription("Mixed greens, Granny Smith apple, strawberries, feta crumbles, candied walnuts, croutons, white balsamic vinaigrette.");
        dublinBayMenuItem.setPrice(13.20);
        dublinBayMenu.add(dublinBayMenuItem);

        dublinBayMenuItem = new MenuItem();
        dublinBayMenuItem.setRestaurants(dublinBay);
        dublinBayMenuItem.setName("Buffalo Chicken Sandwich");
        dublinBayMenuItem.setDescription("Hand-breaded chicken breast dipped in buffalo sauce. Served w/lettuce, tomato, red onion & ranch.");
        dublinBayMenuItem.setPrice(15.40);
        dublinBayMenu.add(dublinBayMenuItem);

        dublinBayMenuItem = new MenuItem();
        dublinBayMenuItem.setRestaurants(dublinBay);
        dublinBayMenuItem.setName("Guinness BBQ Burger");
        dublinBayMenuItem.setDescription("1/2 pound fresh burger with Guinness BBQ sauce, provolone, lettuce, tomato, and red onion.");
        dublinBayMenuItem.setPrice(17.60);
        dublinBayMenu.add(dublinBayMenuItem);

        dublinBayMenuItem = new MenuItem();
        dublinBayMenuItem.setRestaurants(dublinBay);
        dublinBayMenuItem.setName("Shepherd's Pie");
        dublinBayMenuItem.setDescription("Ground beef, fresh vegetables, savory beef gravy, toasted mashed potatoes. Gluten free upon request.");
        dublinBayMenuItem.setPrice(15.40);
        dublinBayMenu.add(dublinBayMenuItem);

        dublinBayMenuItem = new MenuItem();
        dublinBayMenuItem.setRestaurants(dublinBay);
        dublinBayMenuItem.setName("Corned Beef & Cabbage");
        dublinBayMenuItem.setDescription("Slow-cooked & trimmed corned beef, red & green cabbage with Killarney potatoes. Served with Guinness pub mustard.");
        dublinBayMenuItem.setPrice(19.25);
        dublinBayMenu.add(dublinBayMenuItem);

        menuItemRepository.saveAllAndFlush(dublinBayMenu);
    }

    private void createUserTestData() {
        //Test User Roles
        UserRole testAdminRole = new UserRole(0, "admin");
        testAdminRole = userRoleRepository.save(testAdminRole);

        UserRole testDriverRole = new UserRole(0, "driver");
        testDriverRole = userRoleRepository.save(testDriverRole);

        userRoleRepository.flush();

        // Test Admin User

        User testAdmin = new User();
        testAdmin.setUserName("testAdmin");
        testAdmin.setPassword("testAdmin");
        testAdmin.addRole(testAdminRole);

        

        UserInformation userInformation = new UserInformation();
        userInformation.setUser(testAdmin);
        userInformation.setFirstName("Ben");
        userInformation.setLastName("Schroeder");
        userInformation.setEmail("ben-email");
        userInformation.setPhoneNumber("ben-phone-number");
        userInformation.setBirthdate(Date.valueOf("2000-04-01"));
        userInformation.setVeteranStatus(false);
        userInformation.setEmailConfirmed(true);

        System.out.println("Saving Admin User");
        testAdmin.setUserInformation(userInformation);
        testAdmin = userRepository.save(testAdmin);
        //userInformation = userInformationRepository.save(userInformation);

        //Test Driver User

        User testDriver = new User();
        testDriver.setUserName("testDriver");
        testDriver.setPassword("testDriver");
        testDriver.addRole(testDriverRole);
        

        userInformation = new UserInformation();
        userInformation.setUser(testDriver);
        userInformation.setFirstName("Per");
        userInformation.setLastName("Van Dyke");
        userInformation.setEmail("per-email");
        userInformation.setPhoneNumber("per-phone-number");
        userInformation.setBirthdate(Date.valueOf("1950-04-20"));
        userInformation.setVeteranStatus(true);
        userInformation.setEmailConfirmed(true);

        System.out.println("Saving Driver User");
        testDriver.setUserInformation(userInformation);
        testDriver = userRepository.saveAndFlush(testDriver);
        //userInformationRepository.saveAndFlush(userInformation);

        ActiveDriver testActiveDriver = new ActiveDriver();
        testActiveDriver.setUsers(testDriver);
        testActiveDriver.setTimeIn(Instant.parse("2022-05-19T07:00:00.00Z"));
        activeDriverRepository.saveAndFlush(testActiveDriver);

        //Test Confirmed User

        User testCustomer = new User();
        testCustomer.setUserName("testCustomer");
        testCustomer.setPassword("testCustomer");
        

        userInformation = new UserInformation();
        userInformation.setUser(testCustomer);
        userInformation.setFirstName("Roxanne");
        userInformation.setLastName("Printice");
        userInformation.setEmail("roxanne-email");
        userInformation.setPhoneNumber("roxanne-phone-number");
        userInformation.setBirthdate(Date.valueOf("2000-01-01"));
        userInformation.setVeteranStatus(false);
        userInformation.setEmailConfirmed(true);

        testCustomer.setUserInformation(userInformation);
        testCustomer = userRepository.saveAndFlush(testCustomer);
        //userInformationRepository.saveAndFlush(userInformation);

        // Test Unconfirmed User

        User unconfirmedTestUser = new User();
        unconfirmedTestUser.setUserName("unconfirmedTestCustomer");
        unconfirmedTestUser.setPassword("unconfirmedTestCustomer");
        

        userInformation = new UserInformation();
        userInformation.setUser(unconfirmedTestUser);
        userInformation.setFirstName("Marcus");
        userInformation.setLastName("Sauceda");
        userInformation.setEmail("marcus-email");
        userInformation.setPhoneNumber("marcus-phone-number");
        userInformation.setBirthdate(Date.valueOf("2000-01-01"));
        userInformation.setVeteranStatus(false);
        userInformation.setEmailConfirmed(false);

        unconfirmedTestUser.setUserInformation(userInformation);
        unconfirmedTestUser = userRepository.saveAndFlush(unconfirmedTestUser);
        //userInformationRepository.saveAndFlush(userInformation);

    }
}
