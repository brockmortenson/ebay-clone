module.exports = {
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
        //         return res.status(403).send('Incorrect password');
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