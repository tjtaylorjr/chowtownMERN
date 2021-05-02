import express from "express";

const router = express.Router();

router.route("/").get((req, res)  => res.send("this will be the restaurnt api route"));

export default router;
