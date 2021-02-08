import * as Discord from "discord.js";

import constants from "../constants";

/**
 * Handler for messages. Used on Discord.Client "message" events.
 */
class ApiHandler {
    /**
     * Gets market data from CoinMarketCap.
     */
    public async get(message: Discord.Message, amount: Number = 1): Promise<any> {
        const rp = require('request-promise');
        const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
        qs: {
            'amount': amount,
            'symbol': 'DOGE',
            'convert': 'SEK'
        },
        headers: {
            'X-CMC_PRO_API_KEY': constants.API_KEY
        },
        json: true,
        gzip: true
        };

        const response = await rp(requestOptions).then((response: any) => {
            return response;
        }).catch((err: { message: any; }) => {
            console.log('API call error:', err.message);
        });

        this.post(message, response);
    }

    private post(message: Discord.Message, response: any) {
        message.channel.send(
            "```"
            + "Timestamp: " + response.status.timestamp + "\n"
            + "DOGE Amount: " + response.data.amount + "\n"
            + "SEK Value: " + response.data.quote.SEK.price
            + "```"
        );
    }
}

export default ApiHandler;
