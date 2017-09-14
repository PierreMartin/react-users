import User from '../models/user';
import passport from 'passport';
import { calculateAge } from '../../../toolbox/toolbox';
import bcrypt from 'bcrypt-nodejs';
import multer from 'multer';
import sharp from 'sharp';
import { unlinkSync } from "fs";
import crypto from 'crypto';
import path from 'path';
var uploaded = multer().single('formAvatar');

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

/********************* Multer *******************/
var maxSize = 1000 * 1000 * 1000;

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/');
	},
	filename: function(req, file, callback) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (!err) {
				var ext = file.originalname && path.extname(file.originalname);

				if (typeof ext === 'undefined' || ext === '') {
					ext = '.jpg';
				}
				callback(null, raw.toString('hex') + Date.now() + ext.toLowerCase());
			}
		});
	}
});

const upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function(req, file, callback) {
		const typeArray = file.mimetype.split("/");
		var ext = file.originalname && path.extname(file.originalname).toLowerCase();

		if (typeArray[0] !== 'image') {
			return callback(new Error('Something went wrong'), false);
		}

		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(new Error('Only images are allowed'), false);
		}

		callback(null, true);
	}
});

export const uploadAvatarMulter = upload.single('formAvatar');

/**
 * POST /api/user/avatar
 */
export function uploadAvatar(req, res) {
	const id = req.params.id;
	const filename = req.file.filename;
	const newFilenameMain = '150_' + req.file.filename;
	const newFilenameThumbnail1 = '80_' + req.file.filename;
	const avatarId = req.params.avatarId;

	let avatarsSrc = {
			avatarId: avatarId,
			mainProfil: newFilenameMain,
			thumbnail1: newFilenameThumbnail1
	};

  uploaded(req, res, function(err) {
    if (err || !id || !filename) {
      return res.status(500).json({message: 'Une erreur est survenue lors de votre mise à jour de votre avatar'}).end();
    }

		sharp.cache(true);

		// Main image :
		sharp(req.file.path)
			.resize(150, 150)
			.crop(sharp.strategy.entropy)
			.toFile('public/uploads/' + newFilenameMain);

		// Thumbnail image :
		sharp(req.file.path)
			.resize(80, 80)
			.crop(sharp.strategy.entropy)
			.toFile('public/uploads/' + newFilenameThumbnail1, function (err) {
				// for deleting the original image // TODO ATTENTION ON WINDOWS
				unlinkSync('public/uploads/' + filename);
			});
  });

	User.findOne({ '_id': id, 'avatarsSrc': { $elemMatch: { 'avatarId': avatarId } } }, (findErr, userAvatar) => {
		if (userAvatar) {
			console.log('Cet avatar exist deja');

			User.findOneAndUpdate({'_id': id, 'avatarsSrc.avatarId': avatarId},
				{
					$set : {
						'avatarsSrc.$.avatarId': avatarId,
						'avatarsSrc.$.mainProfil': newFilenameMain,
						'avatarsSrc.$.thumbnail1': newFilenameThumbnail1
					}
				}, (err) => {
					if (err) return res.status(500).json({message: 'Une erreur est survenue lors de votre mise à jour de votre avatar'});

					return res.status(200).json({
						message: 'Votre avatar à bien été mis à jour',
						userObj: avatarsSrc
					});
				});
			} else {
			console.log('Cet avatar n\'existe pas');

			User.findOneAndUpdate({'_id': id}, {$push : { avatarsSrc } }, (err) => {
				if (err) return res.status(500).json({message: 'Une erreur est survenue lors de votre mise à jour de votre avatar'});

				return res.status(200).json({
					message: 'Votre avatar à bien été ajouté',
					userObj: avatarsSrc
				});
			});
		}
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
    uploadAvatar,
		uploadAvatarMulter
};
