import { Router } from "express";
import { getVerifiedImage } from "../../utils/index.js";

// import dbClient from "../../models/index.js";
import { requireAuthAdmin } from "../../utils/auth.js";
import {
  addCategory,
  getCategories,
  getCategory,
  getCategoryContent,

} from "../../models/categories/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const dbResponse = await getCategories();
  // console.log(dbResponse);
  res.render("categories/index", {
    title: "general catalogue",
    categories: dbResponse,
  });
});

router.get("/category/:id", async (req, res) => {
  const id = req.params.id;
  const category_data = await getCategoryContent(id);
  const category_info = await getCategory(id);
  console.log(category_info);
  
  // if the category is empty
  if (category_data.length === 0) {
    res.render("categories/category", {
      title: `catalogue of ${category_info.category_name}`,
      category: category_data,
    });
  // if the category has stuff
  } else {
    res.render("categories/category", {
      title: `catalogue of ${category_info.category_name}`,
      category: category_data,
    });
  }
});

router.get("/category-empty", async (req, res) => {
  res.render("categories/category-empty", { title: "empty category" });
});

router.get("/edit", requireAuthAdmin, async (req, res) => {
  res.render("categories/edit", { title: "edit page" });
});

router.get("/add", requireAuthAdmin, async (req, res) => {
  res.render("categories/add", { title: "add page" });
});

router.post("/add", requireAuthAdmin, async (req, res) => {
  const { category_name, description } = req.body;
  const image_path = getVerifiedImage(req.files?.image_path);

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
