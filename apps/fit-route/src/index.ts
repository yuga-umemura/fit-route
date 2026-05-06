import { serve } from "@hono/node-server";
import { routes } from "./routes/index.js";

serve(
  {
    fetch: routes.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof routes;
