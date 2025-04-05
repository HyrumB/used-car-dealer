CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT UNIQUE NOT NULL,
    category_description TEXT NOT NULL,
    image_path TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    role_id SERIAL PRIMARY KEY,
    role_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INTEGER REFERENCES user_roles(role_id) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_name TEXT NOT NULL,
    vehicle_description TEXT NOT NULL,
    image_path TEXT UNIQUE NOT NULL,
    vehicle_price REAL NOT NULL,
    vehicle_owner_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (vehicle_owner_id) REFERENCES "user"(user_id)
);

create table if not exists messages (
    message_sender text not null,
    message_id serial primary key,
    message_content text not null,
    message_sender_email text not null,
    message_timestamp timestamp default current_timestamp
);

-- add data --

-- Inserting into the "category" table
INSERT INTO category (category_name, category_description, image_path) VALUES
('Trucks', 'Heavy-duty vehicles for hauling and towing.', '/images/vehicles/evolve-truck.avif'),
('Vans', 'Multi-purpose vehicles for passengers or cargo.', '/images/vehicles/survan-tn.jpg'),
('mobile Suits', 'fast, mobile machines built for war.', '/images/vehicles/zaku-II.jpg')
ON CONFLICT (category_name) DO NOTHING;

-- Inserting into the "user_roles" table
INSERT INTO user_roles (role_name) VALUES 
('regular_user'),
('trusted_user'),
('admin')
ON CONFLICT (role_name) DO NOTHING;

-- Inserting into the "user" table (with role_id)
INSERT INTO "user" (user_name, user_email, user_password, role_id) VALUES
('king bradley', 'bradly@homuncules.com', '$2b$10$1QPtgHBWysoka7IZ6qkbXegDY6MkNVW3s6BG.zX4adxW2L0FNmOE2', (SELECT role_id FROM user_roles WHERE role_name = 'admin')),
('zeon', 'principality@zeon.com', '$2b$10$SG6NYInZpu2MXJZwm3El0efRqJyOhDij1TBpA7zFB4OeKTMeGz6bm', (SELECT role_id FROM user_roles WHERE role_name = 'trusted_user')),
('mikumiku', 'hatsune@miku.voc', '$2b$10$VnJzgeg0VWUobh.RVxwJJO8qQWw1NnYJbB71LTulVcI/THg0ESHBO', (SELECT role_id FROM user_roles WHERE role_name = 'regular_user'))
ON CONFLICT (user_name) DO NOTHING;

-- Inserting into the "vehicles" table 
INSERT INTO vehicles (vehicle_name, vehicle_description, image_path, vehicle_price, vehicle_owner_id, category_id) VALUES
('Ford F-150', 'Popular and powerful pickup truck', '/images/vehicles/2024_f150.jpg', 45000.75, 1, 1), 
('zaku 01', 'the first mobile suit ever put to mass production', '/images/vehicles/Zaku_I_.webp', 45000.75, 2, 3), 
('zaku 02', 'the 2nd gen zaku made to counter the federations own white-devil', '/images/vehicles/zaku-II.jpg', 45000.75, 2, 3), 
('Ford F-150', 'Popular and powerful pickup truck', '/images/vehicles/f150.avif', 45000.75, 3, 1), 
('Honda Odyssey', 'Comfortable minivan for families', '/images/vehicles/odyssey.avif', 38000.00, 1, 2) 
ON CONFLICT (image_path) DO NOTHING;