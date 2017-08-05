import User from '../models/user';

export default (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `L'email ${email} ne correspond à aucun compte.` });
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Ton email ou ton passport est incorrect.' });
    });
  });
};
