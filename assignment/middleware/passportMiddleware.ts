import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";
import { PassportStrategy } from "../interfaces";

// No need to actually pass the instance of passport since it returns a singleton
const passportStratiegies: PassportStrategy[] = [ localStrategy, passportGitHubStrategy ];
const passportConfig = new PassportConfig(passportStratiegies);
const passportMiddleware = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportMiddleware;
