import User from '../models/user';
import passport from 'passport';

/**
 * GET /api/user/all
 */
export function all(req, res) {
    User.find({}).exec((err, users) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(users);
    });
}


/**
 * GET /api/user/:id
 */
export function single(req, res) {
    const id = req.params.id;

    User.findOne({'_id' : id}).exec((err, user) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        if (!user) {
            return res.status(404).send({ message: 'user non trouvé.' });
        }

        return res.json(user); // res.send(pokemon);
    });
}


/**
 * POST /api/login
 */
export function login(req, res, next) {
    // Do email and password validation for the server
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) return next(authErr);

        if (!user) {
            return res.status(401).json({message: info.message});
        }

        // Passport exposes a login() function on req (also aliased as
        // logIn()) that can be used to establish a login session
        return req.logIn(user, (loginErr) => {
            if (loginErr) return res.status(401).json({message: loginErr});

            return res.status(200).json({
                message: 'Tu es maintenant authentifié.',
                userObj: user
            });

        });

    })(req, res, next);
}


/**
 * POST /api/logout
 */
export function logout(req, res) {
    // Do email and password validation for the server
    req.logout();
    res.redirect('/');
}


/**
 * POST /api/signup
 */
export function signUp(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({email: req.body.email}, (findErr, existingUser) => {
        if (existingUser) {
            return res.status(409).json({message: 'Account with this email address already exists!'});
        }

        return user.save((saveErr) => {
            if (saveErr) return next(saveErr);
            return req.logIn(user, (loginErr) => {
                if (loginErr) return res.status(401).json({message: loginErr});
                return res.status(200).json({
                    message: 'Tu es maintenant authentifié.',
                    userObj: user
                });
            });
        });
    });
}


/**
 * PUT /api/user/:id
 */
export function update(req, res) {
	const data = req.body;
	const id = req.params.id;

	if (id && !data && !data.email) {
		return res.status(400).json({message: 'Une erreur est survenue lors de votre mise à jour de votre profile'});
	}

	const dataForRequest = {
		email: data.email,
		picture: data.picture,
		name: data.name
	};

	User.findOneAndUpdate({'_id' : id}, dataForRequest, (err) => {
		if (err) {
			return res.status(500).json({
				message: 'Une erreur est survenue lors de votre mise à jour de votre profile'
			});
		}

		return res.status(200).json({
			message: 'Votre profile à bien été mis à jour',
			userObj: data
		});
	});
}

export default {
    login,
    logout,
    signUp,
    all,
    single,
		update,
};
