import * as Discord from "discord.js";

/**
 * A Command model. Used for defining and handling commands.
 */
export type Command = {
    name: string;
    description: string;
    usage: string[];
    execute: (message: Discord.Message) => void;
};
