const bcrypt = require('bcryptjs');

module.exports = {
    changePassword: async (req, res) => {
        const db = req.app.get('db');

        const { password } = req.body;
        const { user_id } = req.session.user;

        try {            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const [ updateUser ] = await db.update.change_password(hash, user_id);

            delete updateUser.hash;
            
            req.session.user = updateUser;

            res.status(200).send(req.session.user);

        } catch (err) {
            console.log('Change Password Error', err);
        }
    },

    changeEmail: async (req, res) => {
        const db = req.app.get('db');

        const { email } = req.body;
        const { user_id } = req.session.user;

        // console.log('User session', req.session.user);

        try {
            const [ existingUser ] = await db.auth.check_existing_email(email);

            if (existingUser) {
                return res.status(409).send('A user with this email already exists');
            }
            
            const [ updateUser ] = await db.update.change_email(email, user_id);
            // console.log('Update User Var:', updateUser);

            delete updateUser.hash;

            req.session.user = updateUser;

            res.status(200).send(req.session.user);
            // console.log('Try block session', req.session.user);

        } catch (err) {
            console.log('Change Email Error:', err);
        }
    },

    changeUsername: async (req, res) => {
        const db = req.app.get('db');

        const { username } = req.body;
        const { user_id } = req.session.user;

        try {
            const [ existingUser ] = await db.auth.check_existing_username(username);

            if (existingUser) {
                return res.status(409).send('A user with this username already exists');
            }

            const [ updateUser ] = await db.update.change_username(username, user_id);

            delete updateUser.hash;

            req.session.user = updateUser;

            res.status(200).send(req.session.user);

        } catch (err) {
            console.log('Change Username Error:', err);
        }
    }
}