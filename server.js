/**
 * Imports
 */
import configNodeEnv from "./src/middleware/node-env.js";
import path from "path";

import express from "express";
import session from "express-session";
import pgSession from 'connect-pg-simple';

import pool from "./src/models/index.js";
const pgSessionStore = pgSession(session);

// Middleware
import fileUploads from "./src/middleware/file-uploads.js";
import layouts from "./src/middleware/layouts.js";
import homeRoute from "./src/routes/index.js";
import flashMessages from "./src/middleware/flash-messages.js";

import { configureStaticPaths } from "./src/utils/index.js";
import { fileURLToPath } from "url";
import { testDatabase, setupDatabase } from "./src/models/index.js";

/**
 * Global Variables
 */

const secret = process.env.SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = process.env.NODE_ENV;
const port = process.env.PORT;

/**
 * Create and configure the Express server
 */
const app = express();

// instance the session token
app.use(
  session({
      store: new pgSessionStore({
        pool: pool,
        tableName: "session",
      }),
      name: "SessionID",
      secret: secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true,
        secure: false, // Set to `true` in production with HTTPS
        httpOnly: true, // Prevents client-side access to the cookie
      },
    })
  );

// Configure the application based on environment settings
app.use(configNodeEnv);

// Configure static paths (public dirs) for the Express application
configureStaticPaths(app);

// Set EJS as the view engine and record the location of the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set("layout default", "default");
app.set("layouts", path.join(__dirname, "src/views/layouts"));
app.use(layouts);

// Middleware to handle flash messages
app.use(flashMessages);

// Middleware to process multipart form data with file uploads
app.use(fileUploads);

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse URL-encoded form data (like from a standard HTML form)
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use("/", homeRoute);

/**
 * Start the server
 */

// When in development mode, start a WebSocket server for live reloading
if (mode.includes("dev")) {
  const ws = await import("ws");

  try {
    const wsPort = parseInt(port) + 1;
    const wsServer = new ws.WebSocketServer({ port: wsPort });

    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`);
    });

    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  } catch (error) {
    console.error("Failed to start WebSocket server:", error);
  }
}

// Start the Express server
app.listen(port, async () => {
  await setupDatabase();

  console.log(`Server running on http://127.0.0.1:${port}`);
});
