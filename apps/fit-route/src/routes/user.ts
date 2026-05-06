import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

const app = new Hono();

const createUserSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
});

export const userRoutes = app
  .get("/", (c) => {
    return c.json({
      users: [
        { name: "Taro Tanaka", age: 25 },
        { name: "Hanako Yamada", age: 20 },
      ],
    });
  })
  .post("/", zValidator("json", createUserSchema), async (c) => {
    const data = c.req.valid("json");

    return c.json(
      {
        ok: true,
        message: `${data.name}, ${data.age.toString()} has created!`,
      },
      201,
    );
  });
