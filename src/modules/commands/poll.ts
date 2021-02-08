import * as Discord from "discord.js";
import fs from "fs";
import * as io from "../io";
import Path from "path";

import { Command } from "../../models/commands";
import settings from "../../settings.json";

import constants from "../constants";

const reactImgFolder = "./assets/img/reaction/";

/**
 * Defines the exported command "poll".
 */
const poll: Command = {
    name: "poll",
    description: "Allows you to manage polls.",
    usage: ["create <?date> <time> <answers>", "delete <id>", "<id>"],
    execute: executePoll,
};

/**
 * Handles the execution of the "react" command and its sub-commands.
 *
 * @param {Discord.Message} message The Discord message which called the command.
 */
function executePoll(message: Discord.Message): void {
    const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
    const parameters = commandStr.split(" ");

    // Switch based on sub-command
    switch (parameters[1]) {
        default:
            break;
    }
}

export default poll;
