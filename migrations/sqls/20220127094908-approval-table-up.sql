/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS approval(
   id integer primary key,
   status varchar(50) not null UNIQUE
);