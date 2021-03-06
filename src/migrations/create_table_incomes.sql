CREATE TABLE IF NOT EXISTS Incomes (
        id INT NOT NULL AUTO_INCREMENT
        , amount INT NOT NULL 
        , description VARCHAR(200) NOT NULL 
        , user_id INT NOT NULL
        , category_id INT DEFAULT NULL
        , datetime DATETIME NOT NULL DEFAULT (NOW())
        , created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        , PRIMARY KEY (id)
        , FOREIGN KEY (user_id) REFERENCES Users(id)
        , FOREIGN KEY (category_id) REFERENCES Categories(id)
) 