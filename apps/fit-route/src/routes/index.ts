import { Hono } from "hono";
import { userRoutes } from "./user.js";

const app = new Hono();

const routes = app.route("/api/users", userRoutes);

export { routes };
