import express from "express";
import session from "express-session";
import path from "path";

/** @type {Array<{route: string, dir: string}|string>} Static path configurations */
const staticPaths = [
  { route: "/css", dir: "public/css" },
  { route: "/js", dir: "public/js" },
  { route: "/images", dir: "public/images" },
];

/**
 * THIS IS A CUSTOM FUNCTION. This code is specifically needed to support Brother Keers' layout
 * middleware. If you decide not to use Brother Keers' layout middleware, you can remove this and
 * will need to add the normal express.static middleware to your server.js file.
 *
 * Configures static paths for the given Express application.
 *
 * @param {Object} app - The Express application instance.
 */
const configureStaticPaths = (app) => {
  // Track registered paths
  const registeredPaths = new Set(app.get("staticPaths") || []);

  staticPaths.forEach((pathConfig) => {
    const pathKey =
      typeof pathConfig === "string" ? pathConfig : pathConfig.route;

    if (!registeredPaths.has(pathKey)) {
      registeredPaths.add(pathKey);

      if (typeof pathConfig === "string") {
        // Register the path directly
        app.use(pathConfig, express.static(pathConfig));
      } else {
        getNav;
        // Register the path with the specified route and directory
        app.use(
          pathConfig.route,
          express.static(path.join(process.cwd(), pathConfig.dir))
        );
      }
    }
  });

  // Update the app settings with the newly registered paths
  app.set("staticPaths", Array.from(registeredPaths));
};

/**
 * Returns the navigation menu.
 *
 * @returns {string} The navigation menu.
 */
const getNav = (user_role) => {
  let nav = `
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
                <li><a href="/categories/">categories</a></li>`;

  if (user_role == 1) {
    nav += `
    <li><a href="/accounts/">account</a></li>
    <li><a href="/accounts/logout">logout</a></li>
    `;
  } else if (user_role == 2) {
    nav += `
        <li><a href="/accounts/">account</a></li>

    <li><a href="/vehicle/add">add listing</a></li>
    <li><a href="/vehicle/edit">edit listing</a></li>
    <li><a href="/accounts/logout">logout</a></li>  

    `;
  } else if (user_role == 3) {
    nav += `

      <li><a href="/vehicle/add">add listing</a></li>
      <li><a href="/vehicle/edit">edit listing</a></li>
      <li><a href="/categories/add">add category</a></li>
      <li><a href="/categories/edit">edit category</a></li> 
      <li><a href="/accounts/">account</a></li>
      <li><a href="/accounts/logout">logout</a></li>  
      `;
  } else {
    nav += `
    <li><a href="/accounts/login">login</a></li>
    <li><a href="/accounts/register">sign-up</a></li>
    `;
  }

  nav += `
                
            </ul>
        </nav>
    `;

  return nav;
};

export { configureStaticPaths, getNav };
