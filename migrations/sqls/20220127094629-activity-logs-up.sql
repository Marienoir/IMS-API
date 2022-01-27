/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS activity_log(
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  sales_id integer REFERENCES sales(id),
  purchase_id integer REFERENCES purchase(id),
  stock_id integer REFERENCES stock(id),
  activity varchar,
  created_at timestamp default now(),
  updated_at timestamp default now()
);