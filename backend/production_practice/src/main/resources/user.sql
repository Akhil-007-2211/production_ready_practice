create table users(
    user_id bigint generated always as identity primary key ,
    user_name varchar(100) not null unique,
    user_email varchar(50) not null unique,
    password varchar(50) not null
    );