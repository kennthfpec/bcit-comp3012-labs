import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { LoginUser, userModel } from "../../models/userModel";
import { ExecOptions } from "child_process";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true 
  },
  (req: any, email, password, done) => {
    let user: any;
    
    try {    
      user = userModel.findOne(email);    
    }
    catch (e: any) {
      req.session.messages = [];
      return done(null, false, {
        message: e.message
      });
    }

    user = getUserByEmailIdAndPassword(email, password);
    if (user) {
      return done(null, user);
    }
    else {
      req.session.messages = [];
      return done(null, false, {
          message: "Password is incorrect",
        });
    }
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: any) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
