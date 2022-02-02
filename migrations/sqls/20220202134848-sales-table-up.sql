/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS sales(
  id SERIAL PRIMARY KEY,
  item_id integer REFERENCES stock(id),
  item varchar,
  quantity numeric not null,
  price numeric not null,
  sales_personnel_id integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE cascade,
  payment_status varchar DEFAULT 'cash',
  customer_name varchar,
  customer_email varchar,
  created_at timestamp default now(),
  updated_at timestamp default now()
);