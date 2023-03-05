--*********************************************USERS*********************************************
-- create a new User:
INSERT INTO Users (full_name, username, email)
    VALUES
        (":full_nameInput", ":username_Input", ":email_Input");

-- Read all usernames from all users
SELECT username FROM Users;
-- Read all of a specific user's information
SELECT * FROM Users WHERE Users.username = ":username_from_dropdown_Input"
--Update a user
Update Users SET 
                username = ":username_text_Input",
                full_nameInput =  ":full_name_from_text_Input",
                email =  ":email_from_text_Input"
            Where username = ":username_from_dropdown_Input"
-- Delete a user from the data base based on username
DELETE FROM Users Where username = ":username_from_dropdown_Input";

--*********************************************REACTION_ICONS*********************************************
-- create a new reaction icon
INSERT INTO Reaction_Icons (reaction_type)
    VALUES
        (":reaction_type_Input");
-- Read all reaction types from Reaction_icons Table
SELECT reaction_type FROM Reaction_Icons;
-- Read all info from a selected reaction icon
SELECT * FROM Reaction_Icons WHERE reaction_type = ":reaction_type_text_input"
-- update a Reaction_Icons instance
UPDATE Reaction_Icons SET
                        reaction_type = ":reaction_type_text_Input",
                    WHERE reaction_type = ":reaction_type_from_dropdown_Input";
-- DELETE a Reaction Icon
DELETE FROM Reaction_Icons WHERE reaction_type = ":reaction_type_from_dropdown_Input"

-- *********************************************REACTIONS*********************************************
-- create a new reaction
INSERT INTO Reactions (user_id, post_id, reaction_icon_id)
    VALUES
        ((SELECT user_id FROM Users WHERE username = ":username_from_dropdown_Input"),
            (SELECT post_id FROM Posts WHERE title = ":title_from_dropdown_Input"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = ":reaction_type_from_dropdown_Input"));
-- read a reaction ID based on criteria a user selects
SELECT Reaction.reaction_id  
    FROM Reactions
        LEFT JOIN Users ON Reactions.user_id = Users.user_id
            AND Users.username = ":username_from_dropdown_Input"
        LEFT JOIN Posts ON Reactions.post_id = Posts.post_id
            AND Posts.title = ":title_from_dropdown_Input";
-- UPDATE a reaction
UPDATE Reactions SET
                    Reactions.user_id = (SELECT Users.user_id FROM Users WHERE Users.username = ":username_from_dropdown_Input"),
                    Reactions.post_id = (SELECT Posts.post_id FROM Posts WHERE Posts.title = ":title_from_dropdown_Input")
                    WHERE Reactions.reaction_id = ":reaction ID selected from previous query and stored in local memory";
-- DELETE a reaction
DELETE FROM Reactions Where reaction_id = ":reaction ID selected from previous query and stored in local memory";

--*********************************************COMMENTS*********************************************        
-- create a new comment
INSERT INTO Comments (comment_text, post_id, user_id)
    VALUES
        (":comment_text_input",
            (SELECT post_id FROM Posts WHERE title = ":title_from_dropdown_Input"),
            (SELECT user_id FROM Users WHERE username = ":username_from_dropdown_Input"));
-- Select a comment
SELECT comment_id FROM Comments
    JOIN Users
        ON Comments.user_id = Users.user_id
            AND Users.username = ":username_from_dropdown_Input"
            AND Comments.date_posted = ":time_from_date_and_time_Input";
-- update a comment
UPDATE Comments SET
                    Comments.comment_text = ":comment_text_area_Input"
                WHERE Comments.comment_id = ":Comment_ID_selected_from_previous_query";
-- Delete a comment
DELETE FROM Comments WHERE comment_id = ":comment_id_selected_from_previous_select_query"

--*********************************************USERS_AUTHORS*********************************************
-- create a new follow relationship
INSERT INTO Users_Authors (user_id, author_id)
    VALUES
        ((SELECT user_id FROM Users WHERE username = ":username_from_dropdown_Input"),
            (SELECT author_id FROM Authors WHERE ahandle =":author_handle_from)_dropdown_Input"));
--DELETE a follow relationship
DELETE FROM Users_Authors 
WHERE user_author_id IN 
    (SELECT Users_Authors.user_author_id 
     FROM Users_Authors
     JOIN Users ON Users_Authors.user_id = Users.user_id
     JOIN Authors ON Users_Authors.author_id = Authors.autho_id
     WHERE Users.username = ":username_from_drop_down" 
       AND Authors.ahandle = ":ahandle_from_drop_down");

-- ********************************
-- Posts 
-- *********************************

-- Grab data for Posts Table
select posts.post_id, posts.author_id, full_name, posts.genre_id, genres.genre_name, posts.title, posts.date_posted, posts.post_text
from Posts
     Left Join authors on posts.author_id = authors.author_id
     Left Join genres on posts.genre_id = genres.genre_id
Order By posts.post_id ASC;

-- Edit Post
-- initial data retrieved from props
-- need authors names, genres
-- upon update button click, update query

-- get author names
select full_name, author_id
from authors;

-- get genres needed
select genres.genre_name, genre_id
from genres;

-- update post details
update posts
set author_id = ":author_name_dropdown", genre_id = ":genre_name_dropdown",  title = ":title_input", post_text = ":post_text_input"
where posts.post_id = ":posts.post_id_edit_button_icon_selection"

-- Add Post
-- authors names needed, genres needed, 
-- insert values / create data query

-- get author names
select full_name, author_id
from authors;

-- get genres needed
select genre_name, genre_id
from genres;

-- insert / create data query
insert into posts (author_id, genre_id, title, post_text)
values (":author_name_dropdown", ":genre_desc_dropdown", ":title_input", ":post_text_input");


-- Delete Post
-- icon used to trigger deletion so user not have to know id#
-- cascade delete so post deletion will delete comments, reactions
delete from posts where posts.post_id = ":post_id_delete_button_icon";


-- ********************************
-- Genres 
-- *********************************

-- Grab data for Genres Table
select genres_id, genres_name

-- Add Genre
insert into genres(genre_name)
values (":genre_name_input");

-- Edit Genre
-- triggered by edit icon
update genres
set genre_name = ":genre_name_input"
where genre_id = ":genre_id_edit_icon"

-- Delete Genre
delete from genres where genres.genre_id = ":genre_id_trashcan_icon";


-- ********************************
-- Authors 
-- *********************************

-- Grab data for Authors Page
select authors.author_id, authors.username, authors.full_name, authors.email, authors.admin_id, administrators.full_name as "Admin Name", authors.admin_action  
from authors
     left join Administrators on authors.admin_id = Administrators.admin_id
Order By authors.author_id ASC;

-- Edit Author
-- user clicks edit icon so he/she doesn't have to know author id#
-- dropdown for admin_names populated using query of admin table

-- get admin names
select full_name, admin_id
from administrators;

-- update author info
update authors
set full_name =":full_name_input", username=":username_input", email=":email_input", admin_id = "admin_name_dropdown"; admin_action = ":admin_text_input"
where authors.author_id = ":author_edit_icon";

-- add author
-- user clicks add button
-- dropdown for admin_names poulated using query of admin table

-- get admin names
select full_name, admin_id
from administrators;

-- insert value / create author
insert into authors(full_name, username, email, admin_id, admin_action)
values (":full_name_input", ":username_input", "email_input", "admin_name_dropdown", ":admin_text_input")

-- Delete Author
-- user clicks trashcan icon relating to row for an author therefore user doesn't have
--   to know the author's id#

delete from authors where author_id = ":author_delete_icon";


-- ********************************
-- Administrators 
-- *********************************

-- Grab admin data for Administrator Page
select admin_id, username, full_name, email
from administrators
Order By administrators.admin_id ASC

-- Add an Administrator
insert into administrators (full_name, username, email)
values (":full_name_input","username_input", "email_input");

-- Edit an Administrator
update administrators
set full_name = ":full_name_input", username = ":username_input", email = ":email_input"
where admin_id = ":administrator_edit_icon_clicked";

-- Delete an administrator
-- triggers On Delete update Authors.admin_id to be set to null
delete from administrators where admin_id = ":administrators_id_trashcan_icon";

