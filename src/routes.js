import express from "express";
import UserForge from "./forges/users.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const qty = req.query.qty || 1;
  const users = [];

  for (let i = 0; i < qty; i++) {
    users.push(await UserForge.create());
  }

  res.json(users);
});

export default router;
