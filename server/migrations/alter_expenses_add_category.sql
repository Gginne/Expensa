ALTER TABLE Expenses
    ADD COLUMN category_id INT DEFAULT NULL,
    ADD FOREIGN KEY (category_id) REFERENCES Categories(id);
