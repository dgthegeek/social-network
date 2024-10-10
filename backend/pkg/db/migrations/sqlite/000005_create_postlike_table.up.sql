CREATE TABLE IF NOT EXISTS post_like (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		entries_id INTEGER NOT NULL,
		author_id INTEGER NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (entries_id) REFERENCES post(id),
		FOREIGN KEY (author_id) REFERENCES user(id)
);