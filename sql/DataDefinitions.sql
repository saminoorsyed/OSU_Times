-- Code to define tables and relationships for OSU times database
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Reactions2;
DROP TABLE IF EXISTS Comments2;
DROP TABLE IF EXISTS Users_Authors2;
DROP TABLE IF EXISTS Posts2;
DROP TABLE IF EXISTS Genres2;
DROP TABLE IF EXISTS Authors2;
DROP TABLE IF EXISTS Users2;
DROP TABLE IF EXISTS Administrators2;
DROP TABLE IF EXISTS Reaction_Icons2;

CREATE TABLE Users2
(
    user_id             INT(11) AUTO_INCREMENT PRIMARY KEY,
    full_name           varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50)  NOT NULL,
    CONSTRAINT          UQ_Users2_email
        UNIQUE          (email),
    CONSTRAINT          UQ_Users2_username
        UNIQUE          (username)
) ENGINE=INNODB;

CREATE TABLE Administrators2
(
    admin_id            INT(11) AUTO_INCREMENT PRIMARY KEY,
    full_name           varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50) NOT NULL,
    CONSTRAINT          UQ_Administrators2_username
        UNIQUE          (username),
    CONSTRAINT          UQ_Administrators2_email
        UNIQUE          (email)
) ENGINE=INNODB;

CREATE TABLE Authors2
(
    author_id           INT(11) AUTO_INCREMENT PRIMARY KEY,
    full_name           varchar(50) NOT NULL,
    username            varchar(50) NOT NULL,
    email               varchar(50) NOT NULL,
    admin_action        text,
    admin_id            INT(11),
    CONSTRAINT          FK_Authors2_Admistrators
        FOREIGN KEY     (admin_id)
        REFERENCES      Administrators2(admin_id)
        ON DELETE       SET NULL,
    CONSTRAINT          UQ_Authors2_username
        UNIQUE          (username),
    CONSTRAINT          UQ_Authors2_email
        UNIQUE          (email)
    
) ENGINE=INNODB;

-- Follow table as an intersection table
CREATE TABLE Users_Authors2
(
    user_author_id      INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id             INT(11) NOT NULL, 
    author_id           INT(11) NOT NULL,
    CONSTRAINT          FK_Users2_Authors2_Users
        FOREIGN KEY     (user_id)
        REFERENCES      Users2(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT          fk_Users2_Authors2_Authors2
        FOREIGN KEY     (author_id)
        REFERENCES      Authors2(author_id),
    CONSTRAINT          UQ_Users2_Authors2_user_id_author_id
        UNIQUE          (user_id, author_id)
) ENGINE=INNODB;

CREATE TABLE Genres2
(
    genre_id            INT(11) AUTO_INCREMENT PRIMARY KEY,
    genre_name          varchar(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE Posts2
(
    post_id             INT(11) AUTO_INCREMENT PRIMARY KEY,
    author_id           INT(11) NOT NULL,
    genre_id            INT(11) NOT NULL,
    title               varchar(50) NOT NULL,
    date_posted         DATETIME DEFAULT CURRENT_TIMESTAMP,
    post_text           text NOT NULL,
    CONSTRAINT          FK_Posts2_Genres2
        FOREIGN KEY     (genre_id)
        REFERENCES      Genres2(genre_id),
    CONSTRAINT          FK_Posts2_Authors2
        FOREIGN KEY     (author_id)
        REFERENCES      Authors2(author_id),
    CONSTRAINT          UQ_Posts_title
        UNIQUE          (title)
) ENGINE=INNODB;

CREATE TABLE Comments2
(
    comment_id          INT(11) AUTO_INCREMENT PRIMARY KEY,
    post_id             INT(11) NOT NULL,
    user_id             INT(11) NOT NULL,
    comment_text        text NOT NULL,
    date_commented      DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT          FK_Comments2_Users2
        FOREIGN KEY     (user_id)
        REFERENCES      Users2(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT          FK_Comments2_Posts2
        FOREIGN KEY     (post_id)
        REFERENCES      Posts2(post_id)
        ON DELETE       CASCADE
) ENGINE=INNODB;

CREATE TABLE Reaction_Icons2
(
    reaction_icon_id    INT(11) AUTO_INCREMENT PRIMARY KEY,
    reaction_type       varchar(20) NOT NULL,
    CONSTRAINT          UN_Reaction_Icons2_reaction_type
        UNIQUE          (reaction_type)
) ENGINE=INNODB;

CREATE TABLE Reactions2
(
    reaction_id         INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id             INT(11) NOT NULL,
    post_id             INT(11) NOT NULL,
    reaction_icon_id    INT(11) NOT NULL,
    date_reacted        DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT
        FOREIGN KEY     (user_id)
        REFERENCES      Users2(user_id)
        ON DELETE       CASCADE,
    CONSTRAINT
        FOREIGN KEY     (post_id)
        REFERENCES      Posts2(post_id)
        ON DELETE       CASCADE,
    CONSTRAINT
        FOREIGN KEY     (reaction_icon_id)
        REFERENCES      Reaction_Icons2(reaction_icon_id)
        ON DELETE       CASCADE 
) ENGINE=INNODB;




SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

