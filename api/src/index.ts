import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// Placeholder: will read campuses from D1 once the database exists.
app.get("/campuses", (c) =>
  c.json([{ id: "nile-university", name: "Nile University of Nigeria" }]),
);

export default app;
