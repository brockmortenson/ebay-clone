module.exports = {
    getCart: async (req, res) => {
        console.log('hit getCart')
        const db = req.app.get('db');
        const existingUser = req.session.user;

        const [ cart ] = await db.cart.get_cart_id(existingUser.user_id);

        existingUser.cartID = cart.cart_id;

        const myCart = await db.cart.get_cart([existingUser.user_id, existingUser.cartID]);
        console.log('My Cart:', myCart);

        return res.status(200).send(myCart)
    },
    addItemToCart: async (req, res) => {
        const db = req.app.get('db');
        const { item_id } = req.body;
        const { cartID } = req.session.user;
        // console.log(cartID)
        
        console.log('session-cart:', req.session.user.cart);
        console.log('item-id:', item_id)

        const addedItem = await db.cart.add_to_cart(cartID, item_id);
        console.log('Added-item:', addedItem);
        return res.status(200).send(addedItem);
    }
}