import { RequestHandler } from "express";

/*
FIX ME (types) 😭
*/
export const ensureAuthorized: RequestHandler = (req: any, res: any, next: any) => {
  if (!req.user) {
    res.redirect("auth/login");
  }
  if (req.user.role === "admin") {
    return next();
  }
  res.redirect("dashboard");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthorized: RequestHandler = (req: any, res: any, next: any) => {
    if (req.user.role !== "admin") {
      return next();
    }
    res.redirect("/admin");
}
