import * as Discord from "discord.js";

import { BaseCommand } from "./BaseCommand";

/**
 * A Command model. Used for defining and handling commands.
 */
export type ExecCommand = BaseCommand & {
    execute: (message: Discord.Message) => void;
};
