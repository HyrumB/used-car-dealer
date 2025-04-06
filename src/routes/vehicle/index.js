import { Router } from "express";
import {  getVehicleContent,  addVehicle,  getVehiclesByUser,  getAllVehicles,} from "../../models/vehicle/index.js";
import { requireAuthTrusted, requireAuthAdmin } from "../../utils/auth.js";
import { getCategories } from "../../models/categories/index.js";
import { getVerifiedImage } from "../../utils/index.js";
import { getUserById } from "../../models/accounts/index.js";

const router = Router();

router.get("/edit-grid", requireAuthTrusted, async (req, res) => {
  const vehicles = await getVehiclesByUser(req.session.user_id);

  res.render("vehicle/edit-grid", { title: "edit page", vehicles: vehicles });
});

router.get("/edit-grid-admin/", requireAuthAdmin, async (req, res) => {
  const vehicles = await getAllVehicles(req.session.user_id);

  res.render("vehicle/edit-grid-admin", {
    title: "edit page",
    vehicles: vehicles,
  });
});

router.get("/edit/:id", requireAuthTrusted, async (req, res) => {
  const dbResponse = await getVehicleContent(req.params.id);

  // stop user from editing someone else's vehicle, unless they are admin


  if (req.session.user_role == 3) {
    res.render("vehicle/edit", { title: "edit page", vehicle: dbResponse });

  } else if (dbResponse.vehicle_owner_id == req.session.user_id) {
    res.render("vehicle/edit", { title: "edit page", vehicle: dbResponse });

  } else {
    req.flash("error", "You do not have permission to edit this vehicle");
    res.redirect("/vehicle/edit-grid");
    return;
  }
});

router.post("/edit/:id", requireAuthTrusted, async (req, res) => {
  const {
    vehicle_id,
    vehicle_name,
    description,
    image_path,
    price,
    category_id,
  } = req.body;
  const new_image_path = getVerifiedImage(req.files?.image_path);

  if (!vehicle_id || !vehicle_name || !description || !price) {
    req.flash("error", "Missing required fields.");
    res.redirect("/vehicle/edit-grid");
    return;
  }

  var result;

  if (new_image_path) {
    result = await editVehicle(
      vehicle_id,
      vehicle_name,
      description,
      new_image_path,
      price,
      category_id
    );
  } else {
    result = await editVehicle(
      vehicle_id,
      vehicle_name,
      description,
      image_path,
      price,
      category_id
    );
  }

  // If the category was added successfully, redirect to the new category
  if (result.rowCount === 1) {
    res.redirect(`/vehicle/${vehicle_id}`);
    return;
  }
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

  const result = await addVehicle(
    vehicle_name,
    description,
    image_path,
    price,
    owner_id,
    category_id
  );

  // If the category was added successfully, redirect to the new category
  if (result.rowCount === 1) {
    res.redirect(`/categories/`);
    return;
  }

  res.redirect("/vehicle/add");
});

// The basic listing page
router.get("/:id", async (req, res) => {
  const dbResponse = await getVehicleContent(req.params.id);
  const user = await getUserById(dbResponse.vehicle_owner_id);
  // console.log(dbResponse);
  // console.log(user);
  res.render("vehicle/index", {
    title: `${dbResponse.vehicle_name}`,
    vehicle: dbResponse,
    user_name: user.user_name,
  });
});

export default router;
