


SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Insertion Statements ********************************************************************************

INSERT INTO Users (full_name, username, email)
    VALUES
        ("Kathryn Janeway", "Captain", "kjneway@voyager.com"),
        ("Amal Chakotay", "Commander", "achakotay@makis.com"),
        ("Tom Paris", "Lieutenant", "tparis@starfleet.com");


INSERT INTO Administrators (full_name, username, email)
    VALUES
        ("Mister Neelix","Moral Officer", "mneelix@talax.com"),
        ("Belana Torres", "Chief Engineer", "btorees@makis.com"),
        ("Kes Ocampan", "Lead Botanist", "kocampa@telepathy.com");

INSERT INTO Authors (full_name, username, email, admin_action, admin_id)
    VALUES
        ("The Doctor", "TheDoctor", "thedoctor@hologram.com", NULL,
            NULL),
        ("Tuvok Vulcan", "Commander", "tvuclan@voyager.com", "1) on 11.3.4060 Supreme Commander expressed concern on post content 2)Warned and put on probation on 11.4.4060",
            (SELECT admin_id FROM Administrators WHERE full_name = "Mister Neelix" )),
        ("Seven ofNine", "Borg", "sevenofnine@borg.com", "1)Promote her work to front page (Supreme commander expressed approval)",
            (SELECT admin_id FROM Administrators WHERE full_name = "Belana Torres" )),
        ("Sami Syed", "Supreme Leader", "ssyed@monarchy.com", NULL,
            (SELECT admin_id FROM Administrators WHERE full_name = "Belana Torres" ));


INSERT INTO Users_Authors (user_id, author_id)
    VALUES
        ((Select user_id from Users WHERE full_name = "Kathryn Janeway"),
            (SELECT author_id FROM Authors WHERE full_name = "Seven ofNine")),
        ((Select user_id from Users WHERE full_name = "Kathryn Janeway"),
            (SELECT author_id FROM Authors WHERE full_name = "Tuvok Vulcan")),
        ((SELECT user_id FROM Users WHERE full_name = "Amal Chakotay"),
            (SELECT author_id FROM Authors WHERE full_name = "Tuvok Vulcan"));

INSERT INTO Genres(genre_name)
    VALUES
        ("Social Science"),
        ("Engineering"),
        ("Annoucements"),
        ("Opinions");

INSERT INTO Posts (title, post_text, author_id, genre_id)
    VALUES
        ("Ethics of the Collective", 
            "<p>In the sincerest interest of the future of humanity, I hope to shed light on the ethical system which governs the Borg collective and in many cases mirrors the human economic system known as capitalism. To start I'd like cover my own history:</p><p>My link to the Collective has been severed for nearly four years. If I die, everything that I have accomplished in that time, everything I achieved as an individual, will be lost. My memories, my experiences. It will be as if they, as if I never existed.</p>",
            (SELECT author_id FROM Authors WHERE username = "Borg"),
            (SELECT genre_id FROM Genres WHERE genre_name = "Social Science")),
        ("An Anthropology of space farring cultures",
            "<p>My people taught me a man does not own land. He doesn't own anything but the courage and loyalty in his     heart. That's where my power comes from. This same thinking can be brought to our exploration and protection of space, whether we have a sense of ownership and stewardship over it. What do we owe the inhabitants of the spaces that we come to occupy with our ever expanding society and how do we use the resources of those spaces responsibly</p>",
            (SELECT author_id FROM Authors WHERE username = "TheDoctor"),
            (SELECT genre_id FROM Genres WHERE genre_name="Opinions")),
        ("The varied uses of flux capacitors",
            "<p>The problem with flux capacitors is that they have too many uses from spacial folding to warp drive coordinate settings and the maintenance of environmental systems, flux capacitors are our friens and foes: too many plane crashes... spacial plane crashes due to excess flux energy.blah blah blah blah blah blah blah blah blah</p>",
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

INSERT INTO Reaction_Icons (reaction_type)
    VALUES
        ("like"),
        ("light bulb"),
        ("heart");

INSERT INTO Reactions (user_id, post_id, reaction_icon_id)
    VALUES
        ((SELECT user_id FROM Users WHERE full_name = "Amal Chakotay"),
            (SELECT post_id FROM Posts WHERE title = "An Anthropology of space farring cultures"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "heart")),
        ((SELECT user_id FROM Users WHERE full_name = "Amal Chakotay"),
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "like")),
        ((SELECT user_id FROM Users WHERE full_name = "Kathryn Janeway"),
            (SELECT post_id FROM Posts WHERE title = "Ethics of the Collective"),
            (SELECT reaction_icon_id FROM Reaction_Icons WHERE reaction_type = "like"));


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;