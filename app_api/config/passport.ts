import passport from 'passport';
import local from 'passport-local';
import User from '../models/user.models';

passport.use(new local.Strategy({
    usernameField: 'userName'
},
    (username, password, done) => {
        User.findOne({ userName: username })
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