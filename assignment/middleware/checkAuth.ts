import { RequestHandler } from "express";

/*
FIX ME (types) 😭
*/
export const ensureAuthenticated: RequestHandler = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated: RequestHandler = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}
