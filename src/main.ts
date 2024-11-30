import { Hono } from "jsr:@hono/hono";
import { blocks, modal, slackApi } from "./slack/slack-builders.ts";

const app = new Hono();

app.post("/alert", async (payload) => {
  const response = await slackApi(
    "views.open",
    modal({
      id: "foodfight-modal",
      title: "Start a food fight!",
      trigger_id: payload.trigger_id,
      blocks: [
        blocks.section({
          text: "The discourse demands food drama! *Send in your spiciest food takes so we can all argue about them and feel alive.*",
        }),
        blocks.input({
          id: "opinion",
          label: "Deposit your controversial food opinions here.",
          placeholder:
            "Example: peanut butter and mayonnaise sandwiches are delicious!",
          initial_value: payload.text ?? "",
          hint: "What do you believe about food that people find appalling? Say it with your chest!",
        }),
        blocks.select({
          id: "spice_level",
          label: "How spicy is this opinion?",
          placeholder: "Select a spice level",
          options: [
            { label: "mild", value: "mild" },
            { label: "medium", value: "medium" },
            { label: "spicy", value: "spicy" },
            { label: "nuclear", value: "nuclear" },
          ],
        }),
      ],
    })
  );

  if (!response.ok) {
    console.log(response);
  }
});

Deno.serve(app.fetch);
