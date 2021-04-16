import * as Discord from "discord.js";

/**
 * A CryptoWatchMessage model. Used for managing and updating a Discord Message containing crypto information.
 */
export type CryptoWatchMessage = {
    message: Discord.Message;
    interval: number;
    timestamp: string;
    isMonitoring: boolean;
    amount: number;
    cryptoSymbol: string;
    currencySymbol: string;
    price: number;
};
