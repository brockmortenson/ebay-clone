INSERT INTO users (email, hash, username, birthday, created_on)
VALUES ($1, $2, $3, $4, current_timestamp)
returning *;