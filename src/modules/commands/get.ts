import * as Discord from "discord.js";

import settings from "../../settings.json";

import ApiHandler from "../handlers/api";

import { Command } from "../../models/commands";

const cron = require("node-cron");
const get: Command = {
    name: "start",
    description: "Gets market data from CoinMarketCap.",
    usage: [""],
    execute: executeStart,
};

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function executeStart(message: Discord.Message) {
    const channel = message.channel;
    const author = message.author;
    const admins = settings.admin_list;
    const ah = new ApiHandler;

    // Check if user is in the admin list in settings.json.
    if (!admins.includes(author.id)) {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
        return;
    }

    await ah.get(message);

    cron.schedule("0 */10 * * * *", async () => {
        await ah.get(message);
    })

    channel.send("Started DOGE Watcher. Updates will be posted every 10 minutes.")
}

export default get;
