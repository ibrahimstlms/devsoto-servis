const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};
