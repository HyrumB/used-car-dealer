import { Router } from "express";
import { registerUser, checkUserExists, getUserById } from "../../models/accounts/index.js";
import { body, validationResult } from "express-validator";
import dbClient from "../../models/index.js";
import { requireAuth } from "../../utils/auth.js";

import bcrypt from "bcrypt";

const router = Router();

//  validate info for registration
const registrationValidation = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol."
    ),
];

// register page route

router.get("/register", async (req, res) => {
  res.render("/accounts/register", { title: "registration page" });
});

router.post("/register", registrationValidation, async (req, res) => {
  // Check if there are any validation errors
  const results = validationResult(req);
  if (results.errors.length > 0) {
    results.errors.forEach((error) => {
      req.flash("error", error.msg);
    });
    res.redirect("/accounts/register");
    return;
  }

  // check if fields are empty
  const { username, email, password, confirm_password } = req.body;
  if (!username || !email || !password || !confirm_password) {
    req.flash("error", "missing required fields.");
    res.redirect("/accounts/register");
  }

  // check if user already exists
  const user_email = await checkUserExists(email);
  if (user_email.rows.length > 0) {
    req.flash("error", "Email already in use.");
    res.redirect("/accounts/register");
  }

  // check if passwords dont match
  if (password !== confirm_password) {
    req.flash("error", "Passwords do not match.");
    res.redirect("/accounts/register");
  }

  // register user
  else if (password === confirm_password) {
    await registerUser(username, email, password);
    req.flash("success", "User registered successfully.");
    res.redirect("/accounts/login");
  }
});

// login page route

router.get("/login", async (req, res) => {
  res.render("/accounts/login", { title: "login page" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await dbClient.query(
    'SELECT * FROM "user" WHERE user_email = $1',
    [email]
  );

  if (user.rows.length > 0 && (await bcrypt.compare(password, user.rows[0].user_password))) {

    req.session.user      = user.rows[0].user_name;
    req.session.user_role = user.rows[0].role_id;
    req.session.user_id   = user.rows[0].user_id;

    if (req.session.user_role == 3) {
      req.session.admin = true;
      req.flash("success", "welcome admin");
    }

    else if (req.session.user_role == 2) {
      req.flash("success", "welcome trusted-user");
    }

    else {
      req.flash("success", "You are now logged in.");
    }

    res.redirect("/");
  } else {
    res.redirect("/accounts/login");
  }
});

// account page route
router.get("/", requireAuth, async (req, res) => {
  const user_data = await getUserById(req.session.user_id);
  res.render("accounts/index", { title: "account page", user: user_data });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/accounts/login");
});

export default router;
