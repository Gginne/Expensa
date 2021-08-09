CREATE TABLE IF NOT EXISTS DefaultCategories (
        id INT NOT NULL AUTO_INCREMENT
        , name VARCHAR(100) NOT NULL 
        , type BIT NOT NULL
        , created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        , PRIMARY KEY (id)
        , UNIQUE (name)
);

IF NOT EXISTS(select * FROM `defaultcategories` where name = "Food" and type = 0) BEGIN
        INSERT INTO `defaultcategories`(`name`, `type`) VALUES ("Food", 0);
END
IF NOT EXISTS(select * FROM `defaultcategories` where name = "Transportation" and type = 0) BEGIN
        INSERT INTO `defaultcategories`(`name`, `type`) VALUES ("Transportation", 0);
END
IF NOT EXISTS(select * FROM `defaultcategories` where name = "Housing" and type = 0) BEGIN
        INSERT INTO `defaultcategories`(`name`, `type`) VALUES ("Housing", 0);
END
