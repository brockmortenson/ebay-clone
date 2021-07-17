const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { email, password, username, birthday, created_on } = req.body;

        try {
            const [ existingUser ] = await db.auth.check_existing_user(email, username);

            if (existingUser) {
                return res.status(409).send('A user with this email or username already exists');
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const [ newUser ] = await db.auth.register_user(email, hash, username, birthday, created_on);

            delete newUser.hash;

            req.session.user = newUser;

            res.status(200).send(newUser);
        } catch (err) {
            console.log(err);
            return res.status(500).send('REGISTER ERROR');
        }
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        try {
            const [ existingUser ] = await db.auth.check_existing_user_login(username);

            if (!existingUser) {
                return res.status(404).send('User does not exist');
            }

            const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

            if (!isAuthenticated) {
                return res.status(403).send('Incorrect username or password');
            }

            delete existingUser.hash;

            req.session.user = existingUser;

            res.status(200).send(req.session.user);
        } catch (err) {
            console.log(err);
            return res.status(500).send('LOGIN ERROR');
        }
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getSession: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(403);
        }
    },
    deleteAccount: async (req, res) => {
        const db = req.app.get('db');
        const { user_id } = req.session.user;

        await db.auth.delete_account(user_id)
        res.status(200).send('Account successfully deleted');
    }
}