CREATE TABLE IF NOT EXISTS category (
    vehicle_category_id SERIAL PRIMARY KEY,
    vehicle_category_name TEXT UNIQUE NOT NULL,
    category_description TEXT NOT NULL,
    image_path TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT UNIQUE NOT NULL,
    user_email TEXT UNIQUE NOT NULL,
    user_password TEXT NOT NULL
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

CREATE TABLE IF NOT EXISTS "auth" (
    auth_id SERIAL PRIMARY KEY,
    auth_token TEXT UNIQUE NOT NULL,
    auth_user_id INTEGER NOT NULL,
    auth_expires_at TIMESTAMP NOT NULL,
    auth_level INTEGER NOT NULL,
    FOREIGN KEY (auth_user_id) REFERENCES "user"(user_id)
);

-- add data --

-- Inserting into the "category" table
INSERT INTO category (vehicle_category_name, category_description, image_path) VALUES
('Trucks', 'Heavy-duty vehicles for hauling and towing.', '/images/trucks.jpg'),
('Vans', 'Multi-purpose vehicles for passengers or cargo.', '/images/vans.jpg')
ON CONFLICT (vehicle_category_name) DO NOTHING;

-- Inserting into the "user" table
INSERT INTO "user" (user_name, user_email, user_password) VALUES
('Peter Jones', 'peter.jones@example.com', 'secure_password_3'),
('Susan Brown', 'susan.brown@example.com', 'strong_password_4')
ON CONFLICT (user_name) DO NOTHING;

-- Inserting into the "vehicles" table 
INSERT INTO vehicles (vehicle_name, vehicle_description, vehicle_image, vehicle_price, vehicle_owner_id, vehicle_category_id) VALUES
('Ford F-150', 'Popular and powerful pickup truck', '/images/f150.jpg', 45000.75, 1, 1), 
('Honda Odyssey', 'Comfortable minivan for families', '/images/odyssey.jpg', 38000.00, 2, 2) 
ON CONFLICT (vehicle_image) DO NOTHING;

-- Inserting into the "auth" table
INSERT INTO "auth" (auth_token, auth_user_id, auth_expires_at, auth_level) VALUES
('uvwxyz987654', 1, '2025-05-17 08:00:00', 1),
('rstuvw345678', 2, '2025-06-29 19:45:30', 2)
ON CONFLICT (auth_token) DO NOTHING;