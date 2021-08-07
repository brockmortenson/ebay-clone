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
        // const { user_id } = req.session.user;

        await db.auth.delete_account(req.session.user.user_id)
        res.status(200).send('Account successfully deleted');
    },
    changePassword: async (req, res) => {
        const db = req.app.get('db');
        // const { password } = req.body;
        // const { user_id } = req.session.user;

        // Error says variable $2 is out of range
        // try {
        //     const [ existingUser ] = await db.update.check_user_password(password);
        //     console.log('Existing User:', existingUser)
            
        //     const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
            
        //     if (!isAuthenticated) {
        //         return res.status(403).send('Incorrect email and/or password');
        //     }
            
        //     const salt = bcrypt.genSaltSync(10);
        //     const hash = bcrypt.hashSync(password, salt);
            
        //     const [ updateUser ] = await db.update.change_password(hash, req.session.user.user_id);
        //     console.log(hash)
            
        //     delete updateUser.hash;
            
        //     req.session.user = updateUser;
        //     console.log('req session', req.session.user)
            
        //     res.status(200).send(req.session.user)
        // } catch (err) {
        //     console.log(err);
        //     return res.status(500).send('CHANGE PASSWORD ERROR');
        // }

        // const { password } = req.body;

        // const [ updateProfile ] = await db.update.change_password(password, req.session.user.user_id);

        // delete updateProfile.password;

        // req.session.user = updateProfile;

        // res.status(200).send(req.session.user);
        // console.log(req.session.user)
    }
}