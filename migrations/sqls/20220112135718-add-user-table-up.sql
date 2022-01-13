/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    image_url varchar,
    phone_number varchar,
    gender varchar,
    password varchar NOT NULL,
    role varchar not null REFERENCES roles(role_code),
    deleted boolean default false,
    status varchar default 'active',
    reset_password_token varchar,
    reset_password_expiry timestamp,
    verification_status boolean default false,
    last_login timestamp,
    created_at timestamp default now(),
    updated_at timestamp default now()
);
