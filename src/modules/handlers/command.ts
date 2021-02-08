import * as Discord from "discord.js";

import commands from "../commands";
import constants from "../constants";

/**
 * Handler for commands. Used in the MessageHandler.
 */
class CommandHandler {
    /**
     * Handles a command in Discord.
     *
     * @param message A Discord message of the Discord.Message class.
     */
    public handle(message: Discord.Message) {
        if (constants.COMMAND_PREFIX) {
            // Find appropriate command from message
            const prefixlessStr = message.content.split(constants.COMMAND_PREFIX)[1];
            const commandStr = prefixlessStr.split(" ").shift();
            const command = commands.find((command) => command.name === commandStr);

            // Run command if it exists
            if (command !== undefined) {
                return command.execute(message);
            }
        }
    }
}

export default CommandHandler;
