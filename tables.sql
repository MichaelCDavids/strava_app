drop table if exists summaries;

create table summaries
(
    id serial not null primary key,
    athlete_id int not null,
    activity_type text not null,
    effective_date text not null,
    times_per_week int not null,
    average_distance decimal not null,
    average_pace_per_activity decimal not null,
    fastest_average decimal not null,
    longest_distance decimal not null,
    longest_duration decimal not null
);