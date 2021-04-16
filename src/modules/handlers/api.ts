import * as Discord from "discord.js";

import constants from "../constants";
import { CryptoWatchMessage } from "../../models/CryptoWatchMessage";

import cron from "node-cron";
import rp from "request-promise";

/**
 * Handler for messages. Used on Discord.Client "message" events.
 */
class ApiHandler {
    private cronJob: cron.ScheduledTask | undefined;
    private currentMessage: CryptoWatchMessage | undefined;

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
                response.data.quote[currencySymbol].price +
                "```",
        );
        return;
    }

    /**
     * Sets up a Cron job to print crypto currency price conversion every 10 minutes.
     *
     * @param message           A Discord.Message
     * @param amount            The amount of chosen crypto to convert
     * @param cryptoSymbol      The symbol of the crypto to convert from
     * @param currencySymbol    The symbol of the currency to convert to
     * @param interval          The interval (in minutes) of which to update the monitored job
     */
    public async watch(
        message: Discord.Message,
        amount = 1,
        cryptoSymbol = "DOGE",
        currencySymbol = "SEK",
        interval = 10,
    ): Promise<void> {
        if (this.currentMessage === undefined) {
            const response = await this.get(amount, cryptoSymbol, currencySymbol);
            const currentMessage: CryptoWatchMessage = {
                message: await message.channel.send(
                    "```" +
                        "Status: WATCHING" +
                        "\n" +
                        "(Interval: " +
                        interval +
                        "min)" +
                        "\n\n" +
                        "Latest fetch: " +
                        response.status.timestamp +
                        "\n" +
                        cryptoSymbol +
                        ": " +
                        amount +
                        "\n" +
                        currencySymbol +
                        ": " +
                        response.data.quote[currencySymbol].price +
                        "```",
                ),
                isMonitoring: true,
                interval: 10,
                timestamp: new Date().toISOString(),
                amount: amount,
                cryptoSymbol: cryptoSymbol,
                currencySymbol: currencySymbol,
                price: 0,
            };

            this.currentMessage = currentMessage;

            if (this.cronJob === undefined) {
                this.cronJob = cron.schedule("0 */" + interval + " * * * *", async () => {
                    const response = await this.get(amount, cryptoSymbol, currencySymbol);

                    this.updateCurrentMessage(
                        false,
                        amount,
                        response.status.timestamp,
                        cryptoSymbol,
                        currencySymbol,
                        response.data.quote[currencySymbol].price,
                    );

                    await this.updateCurrentDiscordMessage();
                });
            }
        }
    }

    /**
     * Updates this.currentMessage with new data.
     *
     * @param isMonitoring      The current status of the monitored job
     * @param amount            The amount of chosen crypto to convert
     * @param timestamp         The current timestamp
     * @param cryptoSymbol      The symbol of the crypto to convert from
     * @param currencySymbol    The symbol of the currency to convert to
     * @param price             The price of the converted currency
     */
    private updateCurrentMessage(
        isMonitoring: boolean,
        amount: number,
        timestamp: string,
        cryptoSymbol: string,
        currencySymbol: string,
        price: number,
    ): void {
        if (this.currentMessage !== undefined) {
            this.currentMessage.isMonitoring = isMonitoring;
            this.currentMessage.amount = amount;
            this.currentMessage.timestamp = timestamp;
            this.currentMessage.cryptoSymbol = cryptoSymbol;
            this.currentMessage.currencySymbol = currencySymbol;
            this.currentMessage.price = price;
        }
    }

    /**
     * Updates the displayed Discord message with the new data in this.currentMessage
     */
    private async updateCurrentDiscordMessage(): Promise<void> {
        if (this.currentMessage !== undefined) {
            this.currentMessage.message = await this.currentMessage.message.edit(
                "```" + "Status: " + this.currentMessage.isMonitoring
                    ? "WATCHING"
                    : "STOPPED" +
                          "\n" +
                          "(Interval: " +
                          this.currentMessage.interval +
                          "min)" +
                          "\n\n" +
                          "Latest fetch: " +
                          this.currentMessage.timestamp +
                          "\n" +
                          this.currentMessage.cryptoSymbol +
                          ": " +
                          this.currentMessage.amount +
                          "\n" +
                          this.currentMessage.currencySymbol +
                          ": " +
                          this.currentMessage.price +
                          "```",
            );
        }
    }

    /**
     * Stops monitoring the current currency.
     */
    public stopWatching(): void {
        if (this.cronJob !== undefined) {
            this.cronJob.stop();
            this.cronJob = undefined;
        }

        if (this.currentMessage !== undefined) {
            this.updateCurrentMessage(
                false,
                this.currentMessage.amount,
                this.currentMessage.timestamp,
                this.currentMessage.cryptoSymbol,
                this.currentMessage.currencySymbol,
                this.currentMessage.price,
            );
        }

        this.updateCurrentDiscordMessage().then(() => {
            this.currentMessage = undefined;
        });
    }
}

export default ApiHandler;
