drop table if exists runs, rides;

create table runs(
    id int serial primary key not null,
    activity_name text not null,
    duration int not null,
    pace timestamp not null,
    distance decimal
);

create table rides(
    id int serial primary key not null,
    activity_name text not null,
    duration  int not null,
    pace decimal not null,
    distance decimal
);
