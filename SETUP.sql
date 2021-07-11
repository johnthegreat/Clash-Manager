create table clan
(
	uuid VARCHAR(45) not null
constraint clan_pk
primary key,
	tag  VARCHAR(45) not null,
	name VARCHAR(45) not null
);

create unique index clan_tag_uindex
on clan (tag);

create table player
(
    uuid        char(32)    not null
        constraint player_pk
            primary key,
    name        varchar(45) not null,
    tag         VARCHAR(45) not null,
    phoneNumber VARCHAR(20)
);

create unique index player_tag_uindex
    on player (tag);

