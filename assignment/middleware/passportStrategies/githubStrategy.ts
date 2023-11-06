import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { LoginUser, database } from '../../models/userModel';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "d52f3be17df1e64f034e",
        clientSecret: "71b6f92425ea6de0af2dce1db0c88eccd6f82c77",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: any, refreshToken: any, profile: any, done: VerifyCallback) => {
        console.log(profile);
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
