UPDATE users
SET hash = $1
WHERE user_id = $2
returning *;