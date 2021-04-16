import * as Discord from "discord.js";

import settings from "../../settings.json";
import ApiHandler from "../handlers/api";
import { ApiCommand } from "../../models/ApiCommand";
import constants from "../constants";

const currency: ApiCommand = {
    type: "ApiCommand",
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
async function executeCurrency(message: Discord.Message, ah: ApiHandler) {
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
            getCurrency(message, ah, amount, cryptoSymbol, currencySymbol);
            break;
        case "watch":
            watchCurrency(message, ah, amount, cryptoSymbol, currencySymbol);
            break;
        case "stop":
            stopWatchingCurrency(message, ah);
            break;
        default:
            break;
    }
}

/**
 * Gets the converted value of a specific amount of a crypto and currency and displays in chat.
 *
 * @param { Discord.Message } message   The message that called upon the function
 * @param { ApiHandler } api            A reference to the current ApiHandler object
 * @param { number } _amount            The amount of crypto to be converted into currency
 * @param { String } _cryptoSymbol      The CoinMarketCap API Crypto Symbol
 * @param { String } _currencySymbol    Tge CointMarketCap API Currency Symbol
 */
async function getCurrency(
    message: Discord.Message,
    api: ApiHandler,
    _amount = 1,
    _cryptoSymbol = "DOGE",
    _currencySymbol = "SEK",
): Promise<void> {
    api.getToChat(message, _amount, _cryptoSymbol, _currencySymbol);
}

/**
 * Gets the converted value of a specific amount of a crypto and currency and displays in chat.
 *
 * @param { Discord.Message } message   The message that called upon the function
 * @param { ApiHandler } api            A reference to the current ApiHandler object
 * @param { number } _amount            The amount of crypto to be converted into currency
 * @param { String } _cryptoSymbol      The CoinMarketCap API Crypto Symbol
 * @param { String } _currencySymbol    The CointMarketCap API Currency Symbol
 * @param { number } _interval          The interval in minute between the watched currency gets updated
 */
async function watchCurrency(
    message: Discord.Message,
    api: ApiHandler,
    _amount = 1,
    _cryptoSymbol = "DOGE",
    _currencySymbol = "SEK",
    _interval = 10,
): Promise<void> {
    api.watch(message, _amount, _cryptoSymbol, _currencySymbol, _interval);
}

/**
 * TODO: Rework watchCurrency() to support stopping watch (add id maybe)
 */
async function stopWatchingCurrency(message: Discord.Message, api: ApiHandler): Promise<void> {
    api.stopWatching();
}

export default currency;
