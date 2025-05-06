CREATE DATABASE orders_db;
\c orders_db

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    profile TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL
);




INSERT INTO clients (name, profile) VALUES
('Ana Carolina Freitas', 'https://avatars.githubusercontent.com/u/158210617?v=4'),
('Giovanna Caron', 'https://avatars.githubusercontent.com/u/158209996?v=4'),
('Laura Violla', 'https://avatars.githubusercontent.com/u/158209993?v=4');

INSERT INTO orders (product, price, client_id) VALUES
('Gloss', 25, 1),
('Book', 59, 1),
('Makeup Kit', 98, 2),
('Notebook', 60, 2);
