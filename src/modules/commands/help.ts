import * as Discord from "discord.js";

import { ExecCommand } from "../../models/ExecCommand";

const help: ExecCommand = {
    type: "ExecCommand",
    name: "help",
    description: "Sends this message in DM's.",
    usage: [""],
    execute: executeHelp,
};

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
function executeHelp(message: Discord.Message): void {
    const author = message.author;

    // Send the help text to user who called "help" in DM.
    author.send(
        "Descriptions and usage instructions for commands can be found here:\nhttps://github.com/EpiX0R/doge-watcher/blob/master/COMMANDS.md",
    );
}

export default help;
