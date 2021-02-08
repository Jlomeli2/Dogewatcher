import * as Discord from "discord.js";

import ApiHandler from "../handlers/api";

import { Command } from "../../models/commands";

const get: Command = {
    name: "get",
    description: "Gets market data from CoinMarketCap.",
    usage: [""],
    execute: executeGet,
};

/**
 * Sends the list of available commands to the user who called the "help" command.
 *
 * @param {Discord.Message} message The Discord message which called upon the command.
 */
async function executeGet(message: Discord.Message) {
    const channel = message.channel;
    const ah = new ApiHandler;

    // Get market data.
    const ahResponse = await ah.get();

    console.log(ahResponse);

    // Send the current market data in the same channel the command was called.
    channel.send(
        "```"
        + "Timestamp: " + ahResponse.status.timestamp
        + "DOGE Amount: " + ahResponse.data.amount + "\n"
        + "SEK Value: " + ahResponse.data.quote.SEK.price
        + "```"
    );
}

export default get;
