import User from '../models/user';
import passport from 'passport';
import { calculateAge } from '../../../toolbox/toolbox';
import bcrypt from 'bcrypt-nodejs';
import multer from 'multer';

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

        return res.json(user); // res.send(user);
    });
}


/**
 * POST /api/login
 */
export function login(req, res, next) {
    const data = req.body;
    let errorField = {};

    // handling required fields :
    errorField.email = typeof data.email === 'undefined' || data.email === '';
    errorField.password = typeof data.password === 'undefined' || data.password === '';

    // displaying required fields :
    if (errorField.email || errorField.password) {
        return res.status(400).json({errorField});
    }

    // Do email and password validation for the server
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) return next(authErr);

        // unauthorized error (if wrong password or wrong login) :
        if (!user) {
            return res.status(401).json({message: info.message});
        }

        // login user :
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
    const data = req.body;
    let errorField = {};

    // handling required fields :
    errorField.firstName = typeof data.firstName === 'undefined' || data.firstName === '';
    errorField.lastName = typeof data.lastName === 'undefined' || data.lastName === '';
    errorField.email = typeof data.email === 'undefined' || data.email === '';
    errorField.password = typeof data.password === 'undefined' || data.password === '';
    errorField.birthDateYear = typeof data.birthDateYear !== 'number';
    errorField.birthDateMonth = typeof data.birthDateMonth !== 'number';
    errorField.birthDateDay = typeof data.birthDateDay !== 'number';

    let birthDateFull = new Date(data.birthDateYear, data.birthDateMonth, data.birthDateDay);
    errorField.birthDateFull = Object.prototype.toString.call(birthDateFull) !== '[object Date]';

    // displaying required fields :
    for (let key in errorField) {
        if (errorField[key] === true) {
            return res.status(400).json({errorField});
        }
    }

    data.birthDate = birthDateFull.getTime();
    data.age = calculateAge(birthDateFull);

    const user = new User(data);

    User.findOne({email: data.email}, (findErr, existingUser) => {
        // conflict errors :
        if (existingUser) {
            return res.status(409).json({message: 'Ce compte existe déja !'});
        }

        // create count :
        return user.save((saveErr) => {
            if (saveErr) return next(saveErr);

            // login user :
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
 * POST /api/user/avatar
 */
export function uploadAvatar(req, res, next) {
  console.log('req.file === ', req.file);
  if (req.file && req.file.size > 9000000) {
    return res.status(400).json({message: 'Cette image est trop grosse'}).end();
  }

  const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '/tmp/my-uploads');
    },
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '_' + Date.now() + "_" + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
      const ext = path.extname(file.originalname);

      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }

      callback(null, true);
    }
  }).single('userFile');

  upload(req, res, function(err) {
    if (err) {
      return res.status(500).json('Error in upload image').end();
    }
    return res.status(200).json({message: 'L \'image à bien été uploadé'}).end();
  });

}


/**
 * PUT /api/user/:id
 */
export function update(req, res) {
	const data = req.body;
	const id = req.params.id;
  let errorField = {};

  // handling required fields :
  errorField.firstName = data.firstName === null;
  errorField.lastName = data.lastName === null;
  errorField.email = data.email === null;
  errorField.password = data.password === null;
  errorField.birthDateYear = data.birthDateYear === null;
  errorField.birthDateMonth = data.birthDateMonth === null;
  errorField.birthDateDay = data.birthDateDay === null;

  if (data.birthDateYear || data.birthDateMonth || data.birthDateDay) {
    let birthDateFull = new Date(data.birthDateYear, data.birthDateMonth, data.birthDateDay);
    errorField.birthDateFull = Object.prototype.toString.call(birthDateFull) !== '[object Date]';

    // set field right format :
    data.birthDate = birthDateFull.getTime();
    data.age = calculateAge(birthDateFull);
  }

  if (data.password) {
    data.password = bcrypt.hashSync(data.password);
  }

  // displaying required fields :
  for (let key in errorField) {
    if (errorField[key] === true) {
      return res.status(400).json({errorField});
    }
  }

	if (id && !data && !data.email) {
		return res.status(400).json({message: 'Une erreur est survenue lors de votre mise à jour de votre profil'});
	}

	User.findOneAndUpdate({'_id' : id}, data, (err) => {
		if (err) {
			return res.status(500).json({
				message: 'Une erreur est survenue lors de votre mise à jour de votre profil'
			});
		}

		return res.status(200).json({
			message: 'Votre profil à bien été mis à jour',
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
    uploadAvatar
};
