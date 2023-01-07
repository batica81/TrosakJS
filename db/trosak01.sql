create table if not exists trosak01.prihod
(
    id           int auto_increment
        primary key,
    datum        timestamp default CURRENT_TIMESTAMP not null,
    prihod_iznos int                                 not null,
    prihod_vrsta varchar(50) charset latin1          not null
)
    collate = utf8_bin;

create table if not exists trosak01.raspored
(
    visible     tinyint(1) default 1                 not null,
    id          int auto_increment
        primary key,
    dateCreated datetime   default CURRENT_TIMESTAMP null,
    title       varchar(50)                          null,
    start       datetime                             null,
    end         datetime                             null,
    constraint raspored_id_uindex
        unique (id)
);

create table if not exists trosak01.trosak
(
    id         int auto_increment
        primary key,
    datum      timestamp default CURRENT_TIMESTAMP not null,
    iznos      int                                 not null,
    komentar   varchar(50) charset latin1          not null,
    kategorija varchar(50)                         null
)
    collate = utf8_bin;

