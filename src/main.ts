import { Hono } from "jsr:@hono/hono";

const app = new Hono();

app.post("/alert", async (payload) => {
  console.log(payload);
});

Deno.serve(app.fetch);
