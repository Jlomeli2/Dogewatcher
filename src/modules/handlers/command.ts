import * as Discord from "discord.js";

import Command from "../helpers/commands";

import commands from "../commands";
import constants from "../constants";
import ApiHandler from "./api";

/**
 * Handler for commands. Used in the MessageHandler.
 */
class CommandHandler {
    private ah = new ApiHandler();
    /**
     * Handles a command in Discord.
     *
     * @param message A Discord message of the Discord.Message class.
     */
    public handle(message: Discord.Message): void {
        if (constants.COMMAND_PREFIX) {
            // Find appropriate command from message
            const prefixlessStr = message.content.split(constants.COMMAND_PREFIX)[1];
            const commandStr = prefixlessStr.split(" ").shift();
            const command = commands.find((command) => command.name === commandStr);

            // Run command if it exists and add properties depending on command type
            if (command !== undefined) {
                Command.execute(command, message, this.ah);
            }

            return;
        }
    }
}

export default CommandHandler;
