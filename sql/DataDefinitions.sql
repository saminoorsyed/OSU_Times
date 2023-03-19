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
    full_name           varchar(50) NOT NULL,
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
    full_name           varchar(50) NOT NULL,
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
    full_name           varchar(50) NOT NULL,
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
        REFERENCES      Authors(author_id)
        ON DELETE       CASCADE,
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
    CONSTRAINT          FK_Posts_Genres
        FOREIGN KEY     (genre_id)
        REFERENCES      Genres(genre_id)
        ON DELETE       CASCADE,
    CONSTRAINT          FK_Posts_Authors
        FOREIGN KEY     (author_id)
        REFERENCES      Authors(author_id)
        ON DELETE       CASCADE,
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
    reaction_type       varchar(20) NOT NULL,
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




SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

