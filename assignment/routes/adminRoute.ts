import express from "express";
const router = express.Router();
import { ensureAuthorized } from "../middleware/checkAccess";

router.get("/", ensureAuthorized, (req, res) => {
    let sessionList: { sessionId: string; userId: number; }[] = [];
    let store: Express.SessionStore = req.sessionStore;

    store?.all!((err: any, sessions: any[] | { [sid: string]: any } | null | undefined) => {
        if (typeof sessions === 'object' && sessions !== null) {
          const sessionKeys = Object.keys(sessions as object);
          sessionKeys.forEach((sid) => {
            const session = (sessions as { [sid: string]: any })[sid];
            sessionList.push({ sessionId: sid, userId: session.passport.user });
          });

          res.render("admin", {
            user: req.user,
            sessions: sessionList
          });    
        }
    });
});

router.get("/revoke-session/:sessionId?", (req, res) => {
    if (req.params.sessionId) {
        const store: Express.SessionStore = req.sessionStore;
        store.destroy(req.params.sessionId);
        res.redirect("/admin");
    }
});

export default router;
