/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    image_url varchar NOT NULL,
    phone_number varchar NOT NULL,
    gender varchar NOT NULL,
    password varchar NOT NULL,
    role varchar NOT NULL REFERENCES roles(role_code) ON DELETE CASCADE,
    deleted boolean default false NOT NULL,
    status varchar default 'active' NOT NULL,
    reset_password_token varchar,
    reset_password_expiry timestamp,
    verification_status boolean default false,
    last_login timestamp,
    created_at timestamp default now(),
    updated_at timestamp default now()
);