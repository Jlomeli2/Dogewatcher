// Imports
import * as Discord from "discord.js";
import chalk from "chalk";
import constants from "./modules/constants";

import MessageHandler from "./modules/handlers/message";

// Create client interface and prepare handler
const discordClient = new Discord.Client();
const mh = new MessageHandler();

// Logs ready message
discordClient.on("ready", () => {
    console.log(chalk.green("Crypto Watcher is now watching stonks!"));
});

// Handle commands
discordClient.on("message", (message) => {
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
discordClient.login(constants.DISCORD_TOKEN);
