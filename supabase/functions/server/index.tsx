import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3d5f1a28/health", (c) => {
  return c.json({ status: "ok" });
});

// Get a value by key
app.get("/make-server-3d5f1a28/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const value = await kv.get(key);
    return c.json({ value });
  } catch (err: any) {
    return c.json({ error: err?.message ?? String(err) }, 500);
  }
});

// Set a value by key (body is the value)
app.put("/make-server-3d5f1a28/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const body = await c.req.json();
    await kv.set(key, body);
    return c.json({ ok: true });
  } catch (err: any) {
    return c.json({ error: err?.message ?? String(err) }, 500);
  }
});

// Delete a key
app.delete("/make-server-3d5f1a28/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    await kv.del(key);
    return c.json({ ok: true });
  } catch (err: any) {
    return c.json({ error: err?.message ?? String(err) }, 500);
  }
});

// Batch get (POST with { keys: [] })
app.post("/make-server-3d5f1a28/kv/mget", async (c) => {
  try {
    const { keys } = await c.req.json();
    const values = await kv.mget(keys || []);
    return c.json({ values });
  } catch (err: any) {
    return c.json({ error: err?.message ?? String(err) }, 500);
  }
});

// Batch set (PUT with { entries: { key: value } })
app.put("/make-server-3d5f1a28/kv/mset", async (c) => {
  try {
    const { entries } = await c.req.json();
    if (!entries || typeof entries !== "object") {
      return c.json({ error: "invalid entries" }, 400);
    }
    const keys = Object.keys(entries);
    const values = keys.map((k) => entries[k]);
    await kv.mset(keys, values);
    return c.json({ ok: true });
  } catch (err: any) {
    return c.json({ error: err?.message ?? String(err) }, 500);
  }
});

Deno.serve(app.fetch);