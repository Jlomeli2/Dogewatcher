import * as Discord from "discord.js";

import settings from "../../settings.json";
import ApiHandler from "../handlers/api";
import { Command } from "../../models/commands";
import constants from "../constants";

const currency: Command = {
    name: "currency",
    description: "Gets market data from CoinMarketCap.",
    usage: ["get", "watch", "stop"],
    execute: executeCurrency,
};

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function executeCurrency(message: Discord.Message) {
    const channel = message.channel;
    const author = message.author;
    const admins = settings.admin_list;
    const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
    const parameters = commandStr.split(" ");

    // Check if user is in the admin list in settings.json.
    if (!admins.includes(author.id)) {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
        return;
    }

    // Prepare parameters as valid function input
    const amount = parameters[2] === undefined ? undefined : parseInt(parameters[2]);
    const cryptoSymbol = parameters[3] === undefined ? undefined : parameters[3];
    const currencySymbol = parameters[4] === undefined ? undefined : parameters[4];

    // Switch based on sub-command
    switch (parameters[1]) {
        case "get":
            getCurrency(message, amount, cryptoSymbol, currencySymbol);
            break;
        case "watch":
            watchCurrency(message, amount, cryptoSymbol, currencySymbol);
            break;
        case "stop":
            stopWatchingCurrency(message);
            break;
        default:
            break;
    }
}

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function getCurrency(
    message: Discord.Message,
    _amount = 1,
    _cryptoSymbol = "DOGE",
    _currencySymbol = "SEK",
): Promise<void> {
    const ah = new ApiHandler();

    ah.getToChat(message, _amount, _cryptoSymbol, _currencySymbol);
}

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function watchCurrency(
    message: Discord.Message,
    _amount = 1,
    _cryptoSymbol = "DOGE",
    _currencySymbol = "SEK",
): Promise<void> {
    const ah = new ApiHandler();

    ah.watch(message, _amount, _cryptoSymbol, _currencySymbol);
}

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function stopWatchingCurrency(message: Discord.Message): Promise<void> {
    const ah = new ApiHandler();

    ah.stopWatching(message);
}

export default currency;
