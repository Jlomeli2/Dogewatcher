import * as Discord from "discord.js";

import { Command } from "../../models/commands";

const help: Command = {
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
        "Hello, stranger! You can find the descriptions and usage instructions for commands here:\nhttps://github.com/EpiX0R/fika_bot/blob/master/COMMANDS.md",
    );
}

export default help;
