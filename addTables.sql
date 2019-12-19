CREATE TABLE animeusers2M (username varchar(20), anime_id int,my_watched_episodes int,
my_start_date varchar(30),my_finish_date varchar(30),my_score int,my_status int,my_rewatching varchar(5),
my_rewatching_ep int,my_last_updated varchar(50));

\copy animeusers2M FROM './animeUsers1M.csv' WITH DELIMITER ',' CSV HEADER;
SET CLIENT_ENCODING TO 'utf8';
CREATE TABLE animes (anime_id INT,title text,title_english text,title_japanese text,
title_synonyms text,image_url text,type text,source text,episodes INT,status text,
airing BOOLEAN,aired_string text,aired text,duration text,rating text,
score FLOAT,scored_by INT,rank FLOAT,popularity INT,members INT,favorites INT,background text,
premiered text,broadcast text,related text,producer text,
licensor text,studio text,genre text,opening_theme text,
ending_theme text,duration_min FLOAT,aired_from_year text );

\copy animes FROM './anime_cleaned.csv' WITH DELIMITER ',' CSV HEADER;

ALTER TABLE animes
        DROP COLUMN title_japanese,
        DROP COLUMN title_synonyms,
        DROP COLUMN type,
        DROP COLUMN image_url,
        DROP COLUMN background,
        DROP COLUMN licensor,
        DROP COLUMN related,
        DROP COLUMN opening_theme,
        DROP COLUMN ending_theme; 