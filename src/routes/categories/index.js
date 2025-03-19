import { Router } from "express";

// import dbClient from "../../models/index.js";
import { requireAuth } from "../../utils/auth.js";
import { addCategory, getCategories } from "../../models/categories/index.js";

const router = Router();

router.get("/", async (req, res) => {
  let dbResponse = await getCategories();
  console.log(dbResponse.rows);
  res.render("categories/index", { title: "catalogue", categories: dbResponse.rows });
});

router.get("/edit", requireAuth, async (req, res) => {
  res.render("categories/edit", { title: "edit page" });
});

router.get("/add", requireAuth, async (req, res) => {
  res.render("categories/add", { title: "add page" });
});

export default router;
