import * as Discord from "discord.js";

import ApiHandler from "../handlers/api";
import { ExecCommand } from "../../models/ExecCommand";
import { ApiCommand } from "../../models/ApiCommand";

const Command = {
    /**
     * Executes a command.
     *
     * @param { unknown } command           A command derived from the BaseCommand class
     * @param { Discord.Message } message   A Discord.Message object
     * @param { ApiHandler } apiHandler     A reference to the current ApiHandler object
     */
    execute(command: ExecCommand | ApiCommand, message: Discord.Message, apiHandler: ApiHandler) {
        if (this.isExecCommand(command)) {
            command.execute(message);
        } else if (this.isApiCommand(command)) {
            command.execute(message, apiHandler);
        }
    },
    isExecCommand(command: ExecCommand | ApiCommand): command is ExecCommand {
        return (command as ExecCommand).type === "ExecCommand";
    },
    isApiCommand(command: ApiCommand | ExecCommand): command is ApiCommand {
        return (command as ApiCommand).type === "ApiCommand";
    },
};

export default Command;
