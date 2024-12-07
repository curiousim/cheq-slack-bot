import process from "node:process";
import {
  SlackApiEndpoint,
  SlackApiRequestBody,
} from "../types/slack.models.ts";
import crypto from "crypto-js";

export function slackApi(
  endpoint: SlackApiEndpoint,
  body: SlackApiRequestBody
) {
  return fetch(`https://slack.com/api/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_API_OAUTH_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function verifySlackRequest(request: unknown) {
  console.log(
    "LOGGED OUT SOMETHING FUNNY:  verifySlackRequest(request: any)",
    request
  );

  const secret = process.env.SLACK_SIGNING_SECRET!;
  const signature = request.headers["x-slack-signature"];
  const timestamp = Number(request.headers["x-slack-request-timestamp"]);
  const now = Math.floor(Date.now() / 1000); // match Slack timestamp precision

  // if the timestamp is more than five minutes off assume something’s funky
  if (Math.abs(now - timestamp) > 300) {
    return false;
  }

  const message = `v0:${timestamp}:${request.body}`;
  // Generate HMAC SHA256 hash
  const rawHash = crypto.HmacSHA256(message, secret);
  // Convert WordArray to hex string
  const hash = crypto.enc.Hex.stringify(rawHash);

  // we know the request is valid if our hash matches Slack’s
  return `v0=${hash}` === signature;
}
