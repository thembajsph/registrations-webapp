 create table town_names(
 id serial not null primary key,
 town_name text not null,
 town_code text 
 );

 create table foreign_keys(
 id serial not null primary key,
 town_id text not null,
 reg_numbers text not null
 );


 Insert into town_names (town_name,town_code)
 values ('Cape_town', 'CA');

 Insert into town_names (town_name,town_code)
 values ('Paarl', 'CJ');

 Insert into town_names (town_name,town_code)
 values ('Bellville', 'CY');



 Insert into foreign_keys (town_id,reg_numbers)
 values ('1', 'CA 222-364');

 Insert into foreign_keys (town_id,reg_numbers)
 values ('3', 'CY 222-378');

 Insert into foreign_keys (town_id,reg_numbers)
 values ('2', 'CJ 222-875');











-- town_names table

-- id | town_name | town_code 
-- ----+-----------+-----------
--   1 | Cape_town | CA
--   2 | Paarl     | CJ
--   3 | Bellville | CY
-- (3 rows)

-- foreign_keys table

-- id | town_id | reg_numbers 
-- ----+---------+-------------
--   1 | 1       | CA 222-364
--   2 | 3       | CY 222-378
--   3 | 2       | CJ 222-875
-- (3 rows)


