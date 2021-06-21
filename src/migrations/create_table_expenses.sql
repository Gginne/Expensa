CREATE TABLE IF NOT EXISTS Expenses (
        id INT NOT NULL AUTO_INCREMENT
        , amount INT NOT NULL 
        , description VARCHAR(200) NOT NULL 
        , user_id INT NOT NULL
        , date DATETIME NOT NULL DEFAULT (NOW())
        , created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        , PRIMARY KEY (id)
        , FOREIGN KEY (user_id) REFERENCES Users(id)
) 