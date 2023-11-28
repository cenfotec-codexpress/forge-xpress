import express from "express";
import BusinessForge from "./forges/businesses.js";
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

router.get("/businesses", async (req, res) => {
  const qty = req.query.qty || 1;
  const approved = req.query.approved;
  let businesses = [];

  for (let i = 0; i < qty; i++) {
    businesses.push(await BusinessForge.create());
  }

  if (approved != null) {
    businesses = businesses.map((business) => {
      business.isApproved = approved;
      return business;
    });
  }

  res.json(businesses);
});

export default router;
