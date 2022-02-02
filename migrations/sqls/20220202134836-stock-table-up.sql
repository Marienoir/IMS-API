/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS stock(
  id SERIAL PRIMARY KEY,
  item varchar not null,
  quantity numeric not null,
  price numeric not null,
  last_stocked timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now()
);