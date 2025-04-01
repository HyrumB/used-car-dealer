import { Router } from "express";

// import dbClient from "../../models/index.js";
import { requireAuthAdmin } from "../../utils/auth.js";
import { addCategory, getCategories, getCategoryContent } from "../../models/categories/index.js";

const router = Router();

router.get("/", async (req, res) => {
  let dbResponse = await getCategories();
  // console.log(dbResponse.rows);
  res.render("categories/index", { title: "general catalogue", categories: dbResponse.rows });
});

router.get("/category/:id", async (req, res) => {

  let dbResponse = await getCategoryContent(req.params.id);
  console.log(dbResponse.rows);
  res.render("categories/category", { title: `catalogue of ${dbResponse.rows[0].vehicle_category_name}`, category: dbResponse.rows });
});

router.get("/edit", requireAuthAdmin, async (req, res) => {
  res.render("categories/edit", { title: "edit page" });
});

router.get("/add", requireAuthAdmin, async (req, res) => {
  res.render("categories/add", { title: "add page" });
});

export default router;
