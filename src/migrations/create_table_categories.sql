CREATE TABLE IF NOT EXISTS Categories (
        id INT NOT NULL AUTO_INCREMENT
        , name VARCHAR(100) NOT NULL 
        , type TINYINT NOT NULL
        , public TINYINT NOT NULL
        , user_id INT DEFAULT NULL 
        , created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        , PRIMARY KEY (id)
        , UNIQUE (name)
        , FOREIGN KEY (user_id) REFERENCES Users(id)
);

/* IF NOT EXISTS(select * FROM `categories` name = "Food" and type = 0 and public = 1) BEGIN
        INSERT INTO `categories`(`name`, `type`, `public`, `user_id`) VALUES ("Food", 0, 1, NULL);
END
IF NOT EXISTS(select * FROM `categories` where name = "Transportation" and type = 0 and public = 1) BEGIN
        INSERT INTO `categories`(`name`, `type`, `public`, `user_id`) VALUES ("Transportation", 0, 1, NULL);
END
IF NOT EXISTS(select * FROM `categories` where name = "Home" and type = 0 and public = 1) BEGIN
        INSERT INTO `categories`(`name`, `type`, `public`, `user_id`) VALUES ("Home", 0, 1, NULL);
END */
