drop schema if exists `capstone`;
create schema if not exists `capstone`;
use `capstone`;

create table if not exists `capstone`.`user_roles`
(
id        int auto_increment,
role_name varchar(45),
primary key (id)
);

create table if not exists `capstone`.`users`
(
id        int auto_increment,
user_name varchar(45),
password  varchar(45),
enabled boolean default true,
primary key(id)
);

create table if not exists `capstone`.`communication_method`
(
id                        int auto_increment,
name                      varchar(45),
primary key(id)
);

create table if not exists `capstone`.`user_information`
(
users_id        int,
first_name      varchar(45),
last_name       varchar(45),
email           varchar(45),
phone_number    varchar(45),
birthdate		date,
veteran_status  boolean,
email_confirmed boolean,
communication_type_id int,
primary key (users_id),
foreign key (users_id) references `capstone`.`users` (id),
foreign key (communication_type_id) references `capstone`.`communication_method`(id)
);

create table if not exists `capstone`.`orders`
(
id               int auto_increment,
order_status     varchar(45),
restaurant_notes varchar(250),
driver_notes     varchar(250),
sub_total        float,
delivery_fee     float,
tax              float,
tip              float,
total            float,
time_created     datetime,
scheduled_for    datetime,
net_loyalty		 int,
enabled boolean default true,
primary key (id)
);

create table if not exists `capstone`.`card`
(
id               int auto_increment,
name 			 varchar(45),
card_holder_name varchar(45),
card_expiration  date,
card_security    varchar(45),
card_zip_code    varchar(45),
enabled boolean default true,
primary key(id)
);

create table if not exists `capstone`.`discount`
(
id             int auto_increment,
name           varchar(45),
amount         float default 0,
percent        int default 0,
discount_start datetime,
discount_end   datetime,
enabled boolean default true,
primary key (id)
);

create table if not exists `capstone`.`location`
(
id            int auto_increment,
location_name varchar(45),
address       varchar(45),
city          varchar(45),
state         varchar(45),
zip_code      int,
enabled boolean default true,
primary key(id)
);

create table if not exists `capstone`.`message_type`
(
id   int auto_increment,
name varchar(45),
primary key (id)
);

create table if not exists `capstone`.`restaurant_tag`
(
id   int auto_increment,
name varchar(45),
enabled boolean default true,
primary key (id)
);

create table if not exists `capstone`.`restaurants`
(
id int auto_increment,
location_id int,
owner_id int,
name varchar(45),
enabled boolean default true,
primary key (id),
foreign key (location_id) references `location`(id),
foreign key (owner_id) references `users`(id)
);

create table if not exists `capstone`.`menu_items`
(
id             int auto_increment,
restaurants_id int not null,
name           varchar(45),
description    varchar(250),
price          float,
enabled boolean default true,
primary key (id),
foreign key (restaurants_id) references `capstone`.`restaurants` (id)
);

create table if not exists `capstone`.`reviews`
(
id           int auto_increment,
time_created datetime,
rating       int,
message      varchar(250),
enabled boolean default true,
primary key (id)
);

create table if not exists `capstone`.`order_item`
(
id            int auto_increment,
order_id      int not null,
menu_items_id int not null,
notes         varchar(250),
discount      float,
price         float,
enabled boolean default true,
primary key (id),
foreign key (menu_items_id) references `capstone`.`menu_items` (id),
foreign key (id) references `capstone`.`orders` (id)
);

create table if not exists `capstone`.`message`
(
id                    int auto_increment,
type_id               int,
communication_type_id int,
is_active			  boolean,
time_sent             datetime,
confirmation_code     varchar(45),
primary key (id),
foreign key (communication_type_id) references `capstone`.`communication_method` (id),
foreign key (type_id) references `capstone`.`message_type` (id)
);

create table if not exists `capstone`.`assigned_tags`
(
restaurants_id    int not null,
restaurant_tag_id int not null,
primary key (restaurants_id, restaurant_tag_id),
foreign key (restaurant_tag_id) references `capstone`.`restaurant_tag` (id),
foreign key (restaurants_id) references `capstone`.`restaurants` (id)
);

create table if not exists `capstone`.`menu_item_discount`
(
menu_item_id int not null,
discount_id  int not null,
primary key (menu_item_id, discount_id),
foreign key (discount_id) references `capstone`.`discount` (id),
foreign key (menu_item_id) references `capstone`.`menu_items` (id)
);

create table if not exists `capstone`.`order_restaurant`
(
restaurant_id int not null,
order_id      int not null,
primary key (restaurant_id, order_id),
foreign key (order_id) references `capstone`.`orders`(id),
foreign key (restaurant_id) references `capstone`.`restaurants` (id)
);

create table if not exists `capstone`.`restaurant_review`
(
review_id      int not null,
restaurant_id int not null,
primary key (review_id, restaurant_id),
foreign key (restaurant_id) references `capstone`.`restaurants` (id),
foreign key (review_id) references `capstone`.`reviews` (id)
);

create table if not exists `capstone`.`active_drivers`
(
user_id int not null,
time_in datetime,
primary key (user_id),
foreign key (user_id) references `capstone`.`users` (id)
);

create table if not exists `capstone`.`assigned_roles`
(
role_id  int not null,
users_id int not null,
primary key (role_id, users_id),
foreign key (role_id) references `capstone`.`user_roles` (id),
foreign key (users_id) references `capstone`.`users` (id)
);

create table if not exists `capstone`.`customer_order`
(
customer_id int not null,
order_id    int not null,
primary key (customer_id, order_id),
foreign key (order_id) references `capstone`.`orders`(id),
foreign key (customer_id) references `capstone`.`users` (id)
);

create table if not exists `capstone`.`driver_review`
(
review_id int not null,
driver_id int not null,
primary key (review_id, driver_id),
foreign key (review_id) references `capstone`.`reviews` (id),
foreign key (driver_id) references `capstone`.`users` (id)
);

create table if not exists `capstone`.`order_driver`
(
driver_id int not null,
order_id  int not null,
primary key (driver_id, order_id),
foreign key (order_id) references `capstone`.`orders`(id),
foreign key (driver_id) references `capstone`.`users`(id)
);

create table if not exists `capstone`.`order_discount`
(
order_id    int not null,
discount_id int not null,
primary key (order_id, discount_id),
foreign key (discount_id) references `capstone`.`discount` (id),
foreign key (order_id) references `capstone`.`orders` (id)
);

create table if not exists `capstone`.`payment`
(
order_id   int not null,
payment_id int not null,
primary key (order_id, payment_id),
foreign key (order_id) references `capstone`.`orders` (id),
foreign key (payment_id) references `capstone`.`card` (id)
);

create table if not exists `capstone`.`saved_card`
(
user_id int not null,
card_id int not null,
name    varchar(45)  null,
primary key (user_id, card_id),
foreign key (card_id) references `capstone`.`card` (id),
foreign key (user_id) references `capstone`.`users` (id)
);

create table if not exists `capstone`.`saved_locations`
(
location_id int not null,
user_id    int not null,
primary key (location_id, user_id),
foreign key (location_id) references `capstone`.`location` (id),
foreign key (user_id) references `capstone`.`users` (id)
);