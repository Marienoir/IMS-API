/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS refunds(
  id SERIAL PRIMARY KEY,
  item varchar not null,
  quantity numeric not null,
  reason refund_reason,
  received_by integer not null REFERENCES users(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);