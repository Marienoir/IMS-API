/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS purchase(
  id SERIAL PRIMARY KEY,
  item varchar not null,
  quantity numeric not null,
  price numeric not null,
  approval_status varchar not null,
  delivery_time varchar not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);