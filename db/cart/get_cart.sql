SELECT * FROM saved_items_list
JOIN cart ON saved_items_list.cart_id = cart.cart_id
JOIN item ON saved_items_list.item_id = item.item_id
WHERE cart.cart_id = $2 AND cart.user_id = $1;