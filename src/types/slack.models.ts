export type SlackSlashCommandPayload = {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  is_enterprise_install: boolean;
  response_url: string;
  trigger_id: string;
  payload: never;
};

export type SlackInteractivityPayload = {
  payload: string;
  command: never;
};

export type SlackPayload = SlackSlashCommandPayload | SlackInteractivityPayload;

export type SlackBlockSection = {
  type: "section";
  text: {
    type: "plain_text" | "mrkdwn";
    text: string;
    verbatim?: boolean;
  };
};

export type SlackBlockInput = {
  type: "input";
  block_id: string;
  label: {
    type: "plain_text";
    text: string;
    emoji?: boolean;
  };
  hint?: {
    type: "plain_text";
    text: string;
    emoji?: boolean;
  };
  optional?: boolean;
  dispatch_action?: boolean;
  element: {
    type: string;
    action_id: string;
    placeholder?: {
      type: string;
      text: string;
      emoji?: boolean;
    };
    options?: {
      text: {
        type: "plain_text";
        text: string;
        emoji?: boolean;
      };
      value: string;
    }[];
    initial_value?: string;
    dispatch_action_config?: {
      trigger_actions_on: string[];
    };
  };
};

export type SlackBlock = SlackBlockSection | SlackBlockInput;

export type FoodOpinionModalState = {
  values: {
    opinion_block: {
      opinion: {
        type: "plain_text_input";
        value: string;
      };
    };
    spice_level_block: {
      spice_level: {
        type: "static_select";
        selected_option: {
          text: {
            type: "plain_text";
            text: string;
            emoji: boolean;
          };
          value: string;
        };
      };
    };
  };
};

export type ModalArgs = {
  trigger_id: string;
  id: string;
  title: string;
  submit_text?: string;
  blocks: SlackBlock[];
};

type SlackModalPayload = {
  type: string;
  callback_id?: string;
  team: {
    id: string;
    domain: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  channel?: {
    id: string;
    name: string;
  };
  message: {
    ts: string;
    thread_ts?: string;
  };
  api_app_id: string;
  token: string;
  trigger_id: string;
  view: {
    id: string;
    team_id: string;
    type: string;
    blocks: SlackBlock[];
    private_metadata: string;
    callback_id: string;
    state: FoodOpinionModalState;
    hash: string;
    title: {
      type: "plain_text";
      text: string;
      emoji: boolean;
    };
    clear_on_close: boolean;
    notify_on_close: boolean;
    close: null;
    submit: {
      type: "plain_text";
      text: string;
      emoji: boolean;
    };
    app_id: string;
    external_id: string;
    app_installed_team_id: string;
    bot_id: string;
  };
};

export type SlackApiEndpoint = "chat.postMessage" | "views.open";

export type SlackApiRequestBody = {};

export type BlockArgs = {
  id: string;
  label: string;
  placeholder: string;
};

export type SectionBlockArgs = {
  text: string;
};

export type InputBlockArgs = {
  initial_value?: string;
  hint?: string;
} & BlockArgs;

export type SelectBlockArgs = {
  options: {
    label: string;
    value: string;
  }[];
} & BlockArgs;

export type NotionItem = {
  properties: {
    opinion: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    spiceLevel: {
      select: {
        name: string;
      };
    };
    Status: {
      status: {
        name: string;
      };
    };
  };
};

export type NewItem = {
  opinion: string;
  spiceLevel: string;
  status?: string;
  submitter?: string;
};