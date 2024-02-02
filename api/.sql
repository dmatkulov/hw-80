create schema office collate utf8mb4_general_ci;

use office;

create table categories
(
    id          int auto_increment
        primary key,
    name        varchar(50) not null,
    description text        null
);

create table places
(
    id          int auto_increment
        primary key,
    name        varchar(50) not null,
    description text        null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int          not null,
    place_id    int          not null,
    name        varchar(50)  not null,
    description text         null,
    image       varchar(100) null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id),
    constraint items_places_id_fk
        foreign key (place_id) references places (id)
);

INSERT INTO office.categories (id, name, description) VALUES (1, 'Furniture', 'Furniture pieces, including desks, chairs, and sofas, enhancing the office aesthetics.');
INSERT INTO office.categories (id, name, description) VALUES (2, 'Electronics', 'Electronic devices like computers, laptops, and monitors, ensuring seamless workflow.');
INSERT INTO office.categories (id, name, description) VALUES (3, 'Office Supplies', 'Pens, notebooks, and stationery to keep the team organized and productive.');
INSERT INTO office.categories (id, name, description) VALUES (4, 'Décor', 'Decorative items adding a touch of creativity and inspiration to the office space.');
INSERT INTO office.categories (id, name, description) VALUES (5, 'Kitchen and Breakroom', 'Kitchen facilities and a comfortable breakroom, fostering relaxation and social interaction.');
INSERT INTO office.categories (id, name, description) VALUES (6, '4 updated', '4 updated description');

INSERT INTO office.places (id, name, description) VALUES (1, 'Marketing Department - 5th Floor', 'Hub of marketing activities, this floor houses the marketing team, strategy planners, and creative minds.');
INSERT INTO office.places (id, name, description) VALUES (2, 'Conference Room A', 'A space for collaborative discussions, presentations, and brainstorming sessions.');
INSERT INTO office.places (id, name, description) VALUES (3, 'Social Media Team - Open Workspace', 'An open workspace designed for the dynamic social media team to foster creativity and quick communication.');
INSERT INTO office.places (id, name, description) VALUES (4, 'Executive Lounge', 'A lounge area for executives to unwind, have casual meetings, and discuss strategic initiatives.');
INSERT INTO office.places (id, name, description) VALUES (5, 'Marketing Hall', 'A Hall filled with marketing literature and resources for team members to stay updated on industry trends.');

INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (1, 1, 4, 'Executive Desk - Oak Finish', 'A luxurious oak-finished executive desk for the executive lounge.', null);
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (2, 3, 2, 'Marketing Strategy Whiteboard', 'A large whiteboard for visualizing and strategizing marketing campaigns.', null);
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (3, 2, 3, 'MacBook Pro 15"', 'High-performance MacBook Pro assigned for the social media team.', null);
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (4, 1, 3, 'Modern Lounge Chair', 'A comfortable chair for the marketing library, promoting a relaxed reading environment', 'images/ff07d3a1-674d-40bb-9778-7d32005e1d05.jpg');
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (5, 5, 4, 'Coffee Maker', 'A state-of-the-art coffee maker to keep the team energized during breaks.', null);
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (6, 2, 2, 'Projector', 'High-resolution projector for impactful presentations in Conference Room A.', null);
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (7, 2, 3, 'Lenovo', 'Notebook', 'Notebook');
INSERT INTO office.items (id, category_id, place_id, name, description, image) VALUES (9, 1, 3, 'Modern Lounge Chair New', 'A comfortable chair for the marketing library, promoting a relaxed reading environment', 'images/cba3ad90-0c20-46e7-9ca6-d902c2c2e2fc.jpg');

