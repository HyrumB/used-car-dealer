import { Router } from "express";

// import dbClient from "../../models/index.js";
import { requireAuthAdmin } from "../../utils/auth.js";
import {
  addCategory,
  getCategories,
  getCategoryContent,
} from "../../models/categories/index.js";

const router = Router();

router.get("/", async (req, res) => {
  let dbResponse = await getCategories();
  // console.log(dbResponse.rows);
  res.render("categories/index", {
    title: "general catalogue",
    categories: dbResponse.rows,
  });
});

router.get("/category/:id", async (req, res) => {
  let dbResponse = await getCategoryContent(req.params.id);
  console.log(dbResponse.rows);
  res.render("categories/category", {
    title: `catalogue of ${dbResponse.rows[0].vehicle_category_name}`,
    category: dbResponse.rows,
  });
});

router.get("/edit", requireAuthAdmin, async (req, res) => {
  res.render("categories/edit", { title: "edit page" });
});

router.get("/add", requireAuthAdmin, async (req, res) => {
  res.render("categories/add", { title: "add page" });
});

router.post("/add", async (req, res) => {
  // If the category is missing, redirect back to the form
  const { category_name, description, image_path } = req.body;

  if (!category_name || !description) {
    req.flash("error", "Missing required fields.");
    res.redirect("/categories/add");
    return;
  }

  const result = await addCategory(category_name, description, image_path);

  // If the category was added successfully, redirect to the new category
  if (result.changes === 1) {
    res.redirect(`/categories/`);
    return;
  }

  // If the category was not added successfully, redirect back to the form
  res.redirect("/categories/add");
});

export default router;
