import * as Discord from "discord.js";

import { BaseCommand } from "./BaseCommand";
import ApiHandler from "../modules/handlers/api";

/**
 * An ApiCommand model. Used for defining and handling commands that need access to the API.
 */
export type ApiCommand = BaseCommand & {
    execute: (message: Discord.Message, ah: ApiHandler) => void;
};
