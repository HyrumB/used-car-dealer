CREATE TABLE IF NOT EXISTS category (
    vehicle_category_id SERIAL PRIMARY KEY,
    vehicle_category_name TEXT UNIQUE NOT NULL,
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
    role_id INTEGER REFERENCES user_roles(role_id) -- role_id is now defined in the user table
);

CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_name TEXT NOT NULL,
    vehicle_description TEXT NOT NULL,
    vehicle_image TEXT UNIQUE NOT NULL,
    vehicle_price REAL NOT NULL,
    vehicle_owner_id INTEGER NOT NULL,
    vehicle_category_id INTEGER NOT NULL,
    FOREIGN KEY (vehicle_category_id) REFERENCES category(vehicle_category_id),
    FOREIGN KEY (vehicle_owner_id) REFERENCES "user"(user_id)
);

-- create table if not exists messages (
--     message_title text not null,
--     message_id serial primary key,
--     message_content text not null,
--     message_sender_email integer not null,
--     message_timestamp timestamp default current_timestamp,
-- )

-- add data --

-- Inserting into the "category" table
INSERT INTO category (vehicle_category_name, category_description, image_path) VALUES
('Trucks', 'Heavy-duty vehicles for hauling and towing.', '/public/images/vehicles/evolve-truck.jpg'),
('Vans', 'Multi-purpose vehicles for passengers or cargo.', '/public/images/vehicles/survan.jpg')
ON CONFLICT (vehicle_category_name) DO NOTHING;

-- Inserting into the "user_roles" table
INSERT INTO user_roles (role_name) VALUES 
('regular_user'),
('trusted_user'),
('admin')
ON CONFLICT (role_name) DO NOTHING;

-- Inserting into the "user" table (with role_id)
INSERT INTO "user" (user_name, user_email, user_password, role_id) VALUES
('king bradley', 'bradly@homuncules.com', 'philosophers_stone', (SELECT role_id FROM user_roles WHERE role_name = 'admin')),
('zeon', 'principality@zeon.com', 'gelgoog+char', (SELECT role_id FROM user_roles WHERE role_name = 'trusted_user')),
('Susan Brown', 'susan.brown@example.com', 'bigman', (SELECT role_id FROM user_roles WHERE role_name = 'regular_user'))
ON CONFLICT (user_name) DO NOTHING;

-- Inserting into the "vehicles" table 
INSERT INTO vehicles (vehicle_name, vehicle_description, vehicle_image, vehicle_price, vehicle_owner_id, vehicle_category_id) VALUES
('Ford F-150', 'Popular and powerful pickup truck', '/images/f150.jpg', 45000.75, 1, 1), 
('Honda Odyssey', 'Comfortable minivan for families', '/images/odyssey.jpg', 38000.00, 2, 2) 
ON CONFLICT (vehicle_image) DO NOTHING;