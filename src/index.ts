// Imports
import * as Discord from "discord.js";
import chalk from "chalk";
import constants from "./modules/constants";

import MessageHandler from "./modules/handlers/message";

// Create client interface and prepare handler
const client = new Discord.Client();
const mh = new MessageHandler();

// Logs ready message
client.on("ready", () => {
    console.log(chalk.green("Fika Bot is now serving dammsugare!"));
});

// Handle commands
client.on("message", (message) => {
    // Only listen to developer message in development mode.
    if (constants.NODE_ENV === "dev") {
        if (message.author.id === constants.DEV_ID) {
            mh.handle(message);
        }
        // Never listen to other bots
    } else if (!message.author.bot) {
        mh.handle(message);
    }
});

// Login bot with token
client.login(constants.DISCORD_TOKEN);
