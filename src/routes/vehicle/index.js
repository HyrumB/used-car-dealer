import { Router } from "express";
import { getVehicleContent, addVehicle } from "../../models/vehicle/index.js";
import { requireAuthTrusted } from "../../utils/auth.js";
import { getCategories } from "../../models/categories/index.js";
import { getVerifiedImage } from "../../utils/index.js";

const router = Router();

router.get("/edit", requireAuthTrusted, async (req, res) => {
  res.render("vehicle/edit", { title: "edit page" });
});

router.get("/add", requireAuthTrusted, async (req, res) => {
  const categories = await getCategories();

  // console.log(categories);
  res.render("vehicle/add", { title: "add page", categories: categories });
});

router.post("/add", requireAuthTrusted, async (req, res) => {
  const { vehicle_name, description, price, category_id } = req.body;
  console.log(req.files);
  const image_path = getVerifiedImage(req.files?.image_path);

  // check for empty fields
  if (!vehicle_name || !description || !price || !image_path) {
    req.flash("error", "Missing required fields.");
    res.redirect("/vehicle/add");
    return;
  }
  const owner_id = req.session.user_id;
  console.log(owner_id);
  console.log(category_id);

  const result = await addVehicle(
    vehicle_name,
    description,
    image_path,
    price,
    owner_id,
    category_id
  );

  // If the category was added successfully, redirect to the new category
  if (result.changes === 1) {
    res.redirect(`/categories/`);
    return;
  }

  res.redirect("/vehicle/add");
});

// The basic listing page
router.get("/:id", async (req, res) => {
  const dbResponse = await getVehicleContent(req.params.id);
  console.log(dbResponse);
  res.render("vehicle/index", {
    title: `${dbResponse.vehicle_name}`,
    vehicle: dbResponse,
  });
});

export default router;
