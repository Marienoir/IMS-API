/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS roles(
  "id" SERIAL PRIMARY KEY,
  "role_code" varchar not null UNIQUE,
  "role_name" varchar not null,
  "created_at" timestamp default now(),
  "updated_at" timestamp default now()
);