import passport from 'passport';
import local from 'passport-local';
import User from '../models/user.models';

passport.use(new local.Strategy({
    usernameField: 'userName'
},
    (userName, password, done) => {
        User.findOne({ userName: userName })
            .then((user) => {
                if (!user || !user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect username or password'
                    });
                }
                return done(null, user);
            })
            .catch((err) => {
                message: 'error in passport'
                return done(null, false, err);
            })
    }
));