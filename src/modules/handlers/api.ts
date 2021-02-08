import * as Discord from "discord.js";

import constants from "../constants";

import cron from "node-cron";
import rp from "request-promise";

/**
 * Handler for messages. Used on Discord.Client "message" events.
 */
class ApiHandler {
    private cronJob: cron.ScheduledTask | undefined;
    /**
     * Performs a request to get currency conversion via CoinMarketCap API.
     *
     * @param amount The amount of chosen crypto to convert.
     * @param cryptoSymbol The symbol of the crypto to convert from.
     * @param currencySymbol The symbol of the currency to convert to.
     */
    private async get(amount = 1, cryptoSymbol = "DOGE", currencySymbol = "SEK"): Promise<any> {
        const requestOptions = {
            method: "GET",
            uri: "https://pro-api.coinmarketcap.com/v1/tools/price-conversion",
            qs: {
                amount: amount,
                symbol: cryptoSymbol,
                convert: currencySymbol,
            },
            headers: {
                "X-CMC_PRO_API_KEY": constants.API_KEY,
            },
            json: true,
            gzip: true,
        };

        // Perform request with requestOptions and return
        const response = await rp(requestOptions)
            .then((response) => {
                return response;
            })
            .catch((err: { message: string }) => {
                return err;
            });

        return response;
    }

    /**
     * Runs the get() functions and prints the formatted result to chat.
     *
     * @param message A Discord.Message.
     * @param amount The amount of chosen crypto to convert.
     * @param cryptoSymbol The symbol of the crypto to convert from.
     * @param currencySymbol The symbol of the currency to convert to.
     */
    public async getToChat(
        message: Discord.Message,
        amount = 1,
        cryptoSymbol = "DOGE",
        currencySymbol = "SEK",
    ): Promise<void> {
        const response = await this.get(amount, cryptoSymbol, currencySymbol);

        if (response.message !== undefined) {
            message.channel.send("```" + "API Error:" + "\n" + response.message + "\n" + "```");
            return;
        }

        // TODO: Fix response quote to support multiple currency symbols
        message.channel.send(
            "```" +
                "Timestamp: " +
                response.status.timestamp +
                "\n" +
                cryptoSymbol +
                " Amount: " +
                response.data.amount +
                "\n" +
                currencySymbol +
                " Value: " +
                response.data.quote.SEK.price +
                "```",
        );
        return;
    }

    /**
     * Sets up a Cron job to print crypto value every 10 minutes.
     *
     * @param message A Discord.Message.
     * @param amount The amount of chosen crypto to convert.
     * @param cryptoSymbol The symbol of the crypto to convert from.
     * @param currencySymbol The symbol of the currency to convert to.
     */
    public async watch(
        message: Discord.Message,
        amount = 1,
        cryptoSymbol = "DOGE",
        currencySymbol = "SEK",
    ): Promise<void> {
        message.channel.send(
            "```Crypto Watcher is now watching " +
                amount +
                " " +
                cryptoSymbol +
                " in " +
                currencySymbol +
                " every 10 minutes.```",
        );

        this.getToChat(message, amount, cryptoSymbol, currencySymbol);

        if (this.cronJob === undefined) {
            this.cronJob = cron.schedule("0 */10 * * * *", async () => {
                await this.getToChat(message, amount, cryptoSymbol, currencySymbol);
            });
        }
    }

    /**
     * Stops monitoring the current currency.
     */
    public stopWatching(message: Discord.Message,): void {
        if (this.cronJob !== undefined) {
            this.cronJob.stop();
            this.cronJob = undefined;
        }

        message.channel.send("```Stopped watching the current Crypto...```");
    }
}

export default ApiHandler;
