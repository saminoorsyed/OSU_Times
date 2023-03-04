-- Code to define tables and relationships for OSU times database
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Reactions;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Users_Authors;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Administrators;
DROP TABLE IF EXISTS Reaction_Icons;

CREATE TABLE Users
(
    user_id             INT(11) AUTO_INCREMENT PRIMARY KEY,
    fname               varchar(50) NOT NULL,
    lname               varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50)  NOT NULL,
    CONSTRAINT          UQ_Users_email
        UNIQUE          (email),
    CONSTRAINT          UQ_Users_username
        UNIQUE          (username)
) ENGINE=INNODB;

CREATE TABLE Administrators
(
    admin_id            INT(11) AUTO_INCREMENT PRIMARY KEY,
    fname               varchar(50) NOT NULL,
    lname               varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50) NOT NULL,
    CONSTRAINT          UQ_Administrators_username
        UNIQUE          (username),
    CONSTRAINT          UQ_Administrators_email
        UNIQUE          (email)
) ENGINE=INNODB;

CREATE TABLE Authors
(
    author_id           INT(11) AUTO_INCREMENT PRIMARY KEY,
    fname               varchar(50) NOT NULL,
    lname               varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50) NOT NULL,
    admin_action        text,
    admin_id            INT(11),
    CONSTRAINT          FK_Authors_Admistrators
        FOREIGN KEY     (admin_id)
        REFERENCES      Administrators(admin_id)
        ON DELETE       SET NULL,
    CONSTRAINT          UQ_Authors_username
        UNIQUE          (username),
    CONSTRAINT          UQ_Authors_email
        UNIQUE          (email)
    
) ENGINE=INNODB;

-- Follow table as an intersection table
CREATE TABLE Users_Authors
(
    user_author_id      INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id             INT(11) NOT NULL, 
    author_id           INT(11) NOT NULL,
    CONSTRAINT          FK_Users_Authors_Users
        FOREIGN KEY     (user_id)
        REFERENCES      Users(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT          fk_Users_Authors_Authors
        FOREIGN KEY     (author_id)
        REFERENCES      Authors(author_id),
    CONSTRAINT          UQ_Users_Authors_user_id_author_id
        UNIQUE          (user_id, author_id)
) ENGINE=INNODB;

CREATE TABLE Genres
(
    genre_id            INT(11) AUTO_INCREMENT PRIMARY KEY,
    genre_name          varchar(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Posts
(
    post_id             INT(11) AUTO_INCREMENT PRIMARY KEY,
    author_id           INT(11) NOT NULL,
    genre_id            INT(11) NOT NULL,
    title               varchar(50) NOT NULL,
    date_posted         DATETIME DEFAULT CURRENT_TIMESTAMP,
    post_text           text NOT NULL,
    image_b64_str       BLOB,
    CONSTRAINT          FK_Posts_Genres
        FOREIGN KEY     (genre_id)
        REFERENCES      Genres(genre_id),
    CONSTRAINT          FK_Posts_Authors
        FOREIGN KEY     (author_id)
        REFERENCES      Authors(author_id),
    CONSTRAINT          UQ_Posts_title
        UNIQUE          (title)
) ENGINE=INNODB;

CREATE TABLE Comments
(
    comment_id          INT(11) AUTO_INCREMENT PRIMARY KEY,
    post_id             INT(11) NOT NULL,
    user_id             INT(11) NOT NULL,
    comment_text        text NOT NULL,
    date_commented      DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT          FK_Comments_Users
        FOREIGN KEY     (user_id)
        REFERENCES      Users(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT          FK_Comments_Posts
        FOREIGN KEY     (post_id)
        REFERENCES      Posts(post_id)
        ON DELETE       CASCADE
) ENGINE=INNODB;

CREATE TABLE Reaction_Icons
(
    reaction_icon_id    INT(11) AUTO_INCREMENT PRIMARY KEY,
    image_b64_str       BLOB NOT NULL,
    reaction_type       varchar(20) NOT NULL,
    CONSTRAINT          UN_Reaction_Icons_image_b64_str
        UNIQUE          (image_b64_str),
    CONSTRAINT          UN_Reaction_Icons_reaction_type
        UNIQUE          (reaction_type)
) ENGINE=INNODB;

CREATE TABLE Reactions
(
    reaction_id         INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id             INT(11) NOT NULL,
    post_id             INT(11) NOT NULL,
    reaction_icon_id    INT(11) NOT NULL,
    date_reacted        DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT
        FOREIGN KEY     (user_id)
        REFERENCES      Users(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT
        FOREIGN KEY     (post_id)
        REFERENCES      Posts(post_id)
        ON DELETE       CASCADE,
    CONSTRAINT
        FOREIGN KEY     (reaction_icon_id)
        REFERENCES      Reaction_Icons(reaction_icon_id)
        ON DELETE       CASCADE 
) ENGINE=INNODB;



-- Insertion Statements ********************************************************************************

INSERT INTO Users (fname,lname, username, email)
    VALUES
        ("Kathryn", "Janeway", "Captain", "kjneway@voyager.com"),
        ("Amal", "Chakotay", "Commander", "achakotay@makis.com"),
        ("Tom", "Paris", "Lieutenant", "tparis@starfleet.com");


INSERT INTO Administrators (fname, lname, username, email)
    VALUES
        ("Mister", "Neelix","Moral Officer", "mneelix@talax.com"),
        ("Belana", "Torres", "Chief Engineer", "btorees@makis.com"),
        ("Kes", "Ocampan", "Lead Botanist", "kocampa@telepathy.com");

INSERT INTO Authors (fname, lname, username, email, admin_action, admin_id)
    VALUES
        ("The", "Doctor", "TheDoctor", "thedoctor@hologram.com", NULL,
            NULL),
        ("Tuvok", "Vulcan", "Commander", "tvuclan@voyager.com", "1) on 11.3.4060 Supreme Commander expressed concern on post content 2)Warned and put on probation on 11.4.4060",
            (SELECT admin_id FROM Administrators WHERE fname = "Mister" AND lname = "Neelix" )),
        ("Seven", "ofNine", "Borg", "sevenofnine@borg.com", "1)Promote her work to front page (Supreme commander expressed approval)",
            (SELECT admin_id FROM Administrators WHERE fname = "Belana" AND lname = "Torres" )),
        ("Sami", "Syed", "Supreme Leader", "ssyed@monarchy.com", NULL,
            (SELECT admin_id FROM Administrators WHERE fname = "Belana" AND lname = "Torres" ));


INSERT INTO Users_Authors (user_id, author_id)
    VALUES
        ((Select user_id from Users WHERE fname = "Kathryn" AND lname = "Janeway"),
            (SELECT author_id FROM Authors WHERE fname = "Seven" AND lname = "ofNine")),
        ((Select user_id from Users WHERE fname = "Kathryn" AND lname = "Janeway"),
            (SELECT author_id FROM Authors WHERE fname = "Tuvok" AND lname = "Vulcan")),
        ((SELECT user_id FROM Users WHERE fname = "Amal" AND lname = "Chakotay"),
            (SELECT author_id FROM Authors WHERE fname = "Tuvok" AND lname = "Vulcan"));

INSERT INTO Genres(genre_name)
    VALUES
        ("Social Science"),
        ("Engineering"),
        ("Annoucements"),
        ("Opinions");

INSERT INTO Posts (title, post_text, image_b64_str, author_id, genre_id)
    VALUES
        ("Ethics of the Collective", 
            "<p>In the sincerest interest of the future of humanity, I hope to shed light on the ethical system which governs the Borg collective and in many cases mirrors the human economic system known as capitalism. To start I'd like cover my own history:</p><p>My link to the Collective has been severed for nearly four years. If I die, everything that I have accomplished in that time, everything I achieved as an individual, will be lost. My memories, my experiences. It will be as if they, as if I never existed.</p>",
            NULL,
            (SELECT author_id FROM Authors WHERE username = "Borg"),
            (SELECT genre_id FROM Genres WHERE genre_name = "Social Science")),
        ("An Anthropology of space farring cultures",
            "<p>My people taught me a man does not own land. He doesn't own anything but the courage and loyalty in his     heart. That's where my power comes from. This same thinking can be brought to our exploration and protection of space, whether we have a sense of ownership and stewardship over it. What do we owe the inhabitants of the spaces that we come to occupy with our ever expanding society and how do we use the resources of those spaces responsibly</p>",
            NULL,
            (SELECT author_id FROM Authors WHERE username = "TheDoctor"),
            (SELECT genre_id FROM Genres WHERE genre_name="Opinions")),
        ("The varied uses of flux capacitors",
            "<p>The problem with flux capacitors is that they have too many uses from spacial folding to warp drive coordinate settings and the maintenance of environmental systems, flux capacitors are our friens and foes: too many plane crashes... spacial plane crashes due to excess flux energy.blah blah blah blah blah blah blah blah blah</p>",
            NULL,
            (SELECT author_id FROM Authors WHERE username = "TheDoctor"),
            (SELECT genre_id FROM Genres WHERE genre_name="Opinions"));

INSERT INTO Comments (comment_text, post_id, user_id)
    VALUES
        ("Great article Doctor!",
            (SELECT post_id FROM Posts WHERE title = "An Anthropology of space farring cultures"),
            (SELECT user_id FROM Users WHERE username = "Commander")),
        ("Novel insight into the collective!",
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT user_id FROM Users WHERE username = "Captain")),
        ("I hate the Borg!!!",
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT user_id FROM Users WHERE username = "Captain"));

-- image to string converter:
-- https://codebeautify.org/image-to-base64-converter
-- string to image converter:
-- https://codebeautify.org/base64-to-image-converter

INSERT INTO Reaction_Icons (image_b64_str, reaction_type)
    VALUES
        ("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",
            "like"),
        ("iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAYAAADHyrhzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAT3SURBVHhe7ZpNbBRlGMefmmharLFNS1gTKFUBy0G7bS80slrkUCEkFhLLQZHSiwc/Wj1ZQzQxttzEqidJFEw4CAnUxI96QLAlaQ9uWfTAto39AKJdKWlJCiWYuM7/mXnX18bdTNnnmQUzv2TyzszOPO/ub9/vmaK0A4VQMjlKoQyLe7w0xCGUYRHKsAhlWBRMxuzvU7zdSRSsN3lps/s/fHH2L07vBMJqYhHKsAhlWOQt49PufdTbtcs70ufDrp10qKfdO5IlLxk3Fubp7HdHKD7YR0d73/DO6oE8Rga/osFvD3Pe0uQlY0VpGe1sf5f3vz/ey1K0QGzkAZAn8hYHXWu+dL/SlN7zZFH65eby9JXfJr2zuRn45vP0TwMnvaPcICZiI4+Db7V4Z+URGWegyO5vq6PZmWnaWNdEXR//4H0iQ8+rWyiZ+JEqI2vp/cPndEqFg0hvgi/XeeCkkz6IkuadlQWx3Tx0RADRESiG15UPVXtH/walB43f9Ph5ujie8M66VK2P0tr1tVQfey7rj80VWwr14Th+xNGP3vTduDbEWpwG8h0WFDRqMlASIAHdoM3qVeVUUV5KayLlfHxpZo6uzi3Q5dQcHxti29vohdc/UK0WS1GRARE9rz2TqQ4VZffTjqbHKVqzhkqK7+NzS1m8eYsSyUv09Zlf6Or8dT6H0tHZc0K9ehjEZaBa7N9XnxkU7Wh6grZueiyrhKVAyqnhUUfKz3yMkvG20zsFUW1EZdgloqT4Xmp9toEao496ny6PocSvdKw/7sj5k0VAiHaVEZ2oHepuz1SNvS2Nty0C4F7EAIgZxPxHTMaFc2cyPQaqBtqHfEGM553SBRAfmyZiMvo+e49T01hKsXVTDccEJg8tRGSgGJt/TVKEwVQX5GGqoQYiMowINJr5tBPZ2FC9imODuDOK1UJERnzA/YIbqiOcalDrtUEXRvTaDREZN65f49SMKjWoLCvldDY1zakGYm0GMEVZg9URd4yh+axFRIZBs2Ss8DmCzQcRGVhrAGNTf3CqASZ02ojIqFrnzhsWF29xqgGG5aBqXS2nGojIMLPK0ekUpxqMTbqxNSdsIjI21j3N6WWsTcwv8L4kmMmOeaJNXhqIyGh4qiXTbgwlJjmVBFN6gDyQlxZCDWgZxba18f6p4aRo6UAsxAT1MUjXm8aLyADNrR38z6FIH+kb9s7mD2IhJmLv8h5YaSEmA42oebo2NpUSEYIYiAUQW3v5T0wGaG7tpM3b9vI+Vqqwnnm7oGogBkBMxNZGVAZ4seNgZiyAdUzzg5YD7jneH+d9xELMIBCXwQu4n5zOCDF13i+49lj/CO8jBmJpr30axGUAI8R0t6Zr9AOuNfKCFAFUZAD8CHSFYCgxwakf8OwEoJ0IUgRQkwFi293GFGMFP1UF12AUC8y9QaIqY2Xkn67Qz6zTvsa+NyjUnrUazPuejdGHqcJbrcoGSpAZzhfi/dDAZCyXQshQrSY2DxQTRZzOJdeGawpJYCVjS02aHlnJu1mZuEJ0OlnE+//rklHiYwnTzzWaBCbjbiCUYRGYjIWb3k4O/FyjibqMmqi7ZjlysYjGU0Qz1/57w2fDE27jae4JGvXeBC+4LffF944DJ/itv6BRlwH4ve8ve/kt31ygRDTv7iiICBCIjLuFsDexCGVYhDIsQhkWoQyLUIZFKMMilJGB6G+5DPmRoSeM8QAAAABJRU5ErkJggg==",
            "light bulb"),
        ("iVBORw0KGgoAAAANSUhEUgAAAD8AAAA1CAYAAAD2xDO5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAQuSURBVGhD7ZlZbExRGMc/UkujUy1TtKhqiLbSJtSSFBFREZTwTOZNH6zxVBqxvFgSDzx4wIPomyWx1a4hIZVYIilNCbGUVklrG0lbmjD/7547c43LvefO3WLmlzRneTg9v+8s95wz/X5GoCSlv0iTkpR8spKST1ZS8slKSj5ZseWE96mtld49eUTtT5pEDVF6YCjlFpdR4fTZosaY7vAXenn3drSdF3dvUeGMOZxHKtOWGRKSv7pvKzVfOUPv374WNX+SnhGgkgXLqHJtLWWPzhe1v4Pg1e+uoeaGelGjDwJavmIVzQqt+WtbMliSRyfPbVtHXz52iZoYwzMzKNzdQ99/9ImaGLNDa6lqyx5RUqjfvZlu1x0UpRhoZ1BaGufRHv5UEITKdbUchESQlr+2fyc1HNonSkQFI4M0fkQOdzYYyBC1sQ6//NBJT9veRYORV1RGq+sucv5IaHF0ig8ckEZl48ZQ3rDsyF8W12npDH+LtNOh2xaCYQUp+bM7NtCd40c5j87OKy2OiAe5/C8QhBuPWqj942cuY8qmB7Ki4pBFW4H0wVz+F719fdzWq/edXE4kAKbl7584Sqe2b+C8TGe1NL1+Q40tz0VJoaJ4QmTEx4qSeTALEASAzbD6mDKbZDD1qcOGpIpDeOHUUmlxAEkETQV5K+Jg0uhRHDiAr4LRZqmHqZE/vilEDy+f5vyyGVN016QMWL9Au0dY5WTjPer6+o2XUs31ZlFrDsORx6ir4tMmFCQsDiBthziYVTSRU/QTM0AGQ/nmhvMiB/nxIucfMBjqEpSd+obyjy+c5BSfMr9SMDKHU5wOZTCU7/n8idNgIMCpH1GXovZ4bQZD+Y7WF5wOzxzCqR9RT4KyGMr/zxjKZ43I5TTc3cupH8GpzwqG8sPylR2+62uYUz+i9i23qJRTsxjKF86cy6l6Lvcj6jlf9pprKF9SWSVyytncb2BQ1BMj7voyGMrj1lQ4rYLzD569sry+nKKx5Rmn2Xn5NHl+bKDMYCgPKtdv5RTiN5uUm5QfwK1OHfWq2r2cymBKHlfG8uUrOa88TnRw3kuUhw2lH3jRkR11IPWYcWBFBT9UAlxHca30Au1dHjv8xtONnJfF1MirVNddin5O8M+9mAHx4uiTVaTk8VTkZQD0xK2+3wEpeeBVAOwWB9LywO0AOCEOLMkDtwLglDiwLA+cDoCT4iAheeBUAJwWB9K/2PwN/Mh4OLTIlnMA3vbVe4RT4sA2eWBHALQzx0lxYKs8iA8AXnzx5G0GN8WB7fIgPgAYfe0vNXq4LQ4S3vD0QKfReUgA7ealhxfiwBF5YDYAXokDx+SBUQC8FAeOrPl49PYA4KU4cEUexAdAxStx4Oi01xK/BEDJ/CWeiQPXRl4FM6B+Vw0NzhxKS7fIv7vZievyfsK1ae9Hklie6BeA7VF1k0f3AgAAAABJRU5ErkJggg==",
            "heart");

INSERT INTO Reactions (user_id, post_id, reaction_icon_id)
    VALUES
        ((SELECT user_id FROM Users WHERE fname = "Amal"),
            (SELECT post_id FROM Posts WHERE title = "An Anthropology of space farring cultures"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "heart")),
        ((SELECT user_id FROM Users WHERE fname = "Amal"),
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "like")),
        ((SELECT user_id FROM Users WHERE fname = "Kathryn"),
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "like"));


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

