import { Hono } from "npm:hono";
import { prettyJSON } from "npm:hono/pretty-json";

const app = new Hono();
app.use(prettyJSON());

app.post("/alert", (c) => {
  console.log(c.req.parseBody());

  return c.json({ message: "Alert received" });
});

Deno.serve(app.fetch);
