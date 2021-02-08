import * as Discord from "discord.js";
import fs from "fs";
import * as io from "../io";
import Path from "path";

import { Command } from "../../models/commands";
import settings from "../../settings.json";

import constants from "../constants";

const reactImgFolder = "./assets/img/reaction/";

/**
 * Defines the exported command "react".
 */
const react: Command = {
    name: "react",
    description: "Allows you to use reaction images.",
    usage: ["add <name>", "remove <name>", "<name>"],
    execute: executeReact,
};

/**
 * Handles the execution of the "react" command and its sub-commands.
 *
 * @param {Discord.Message} message The Discord message which called the command.
 */
function executeReact(message: Discord.Message): void {
    const commandStr = message.content.split(constants.COMMAND_PREFIX)[1];
    const parameters = commandStr.split(" ");

    // Switch based on sub-command
    switch (parameters[1]) {
        case "add":
            addReaction(parameters[2], message);
            break;
        case "remove":
            removeReaction(parameters[2], message);
            break;
        default:
            sendReaction(parameters[1], message);
            break;
    }
}

/**
 * Handler for "react [name]".
 *
 * Sends a message with the reaction defined by name
 * to the channel where the command was called.
 *
 * @param {String} name The name of the reaction.
 * @param {Discord.Message} message The Discord message which called the command.
 */
function sendReaction(name: string, message: Discord.Message): void {
    const author = message.author;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    const availableReactions = io.getReactionImages();
    let reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Assure filename is safe and not PathLike
    if (reactionFilename) {
        reactionFilename = Path.basename(reactionFilename);
    }

    // Sends the file if it was found, otherwise sends error message.
    if (reactionFilename !== undefined) {
        channel.send({ files: [reactImgFolder + reactionFilename] });
    } else {
        channel.send(`${author}.\n\n:x: The reaction \`${name}\` does not exist. :x:`);
    }
}

/**
 * Handler for "react add [name]".
 *
 * Saves the attached file as a new reaction with the given name. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 * This function requires the user calling it to be in the settings.json admin_list.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function addReaction(name: string, message: Discord.Message): void {
    const admins = settings.admin_list;
    const author = message.author;
    const attachments = message.attachments;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    const availableReactions = io.getReactionImages();
    let reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Check if user is in the admin list in settings.json.
    if (!admins.includes(author.id)) {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
        return;
    }

    // Assure filename is safe and not PathLike
    if (reactionFilename) {
        reactionFilename = Path.basename(reactionFilename);
    }

    // Creates the file if it was not found, otherwise sends error message.
    if (reactionFilename === undefined) {
        io.saveDiscordMessageAttachments(name, reactImgFolder, attachments);

        channel.send(
            `:white_check_mark: Created reaction \`${name}\`! You can now use it with \`${constants.COMMAND_PREFIX}react ${name}\`! :white_check_mark:`,
        );
    } else {
        channel.send(
            `${author}.\n\n:x: The reaction \`${name}\` already exists. Please use another name or remove the current reaction first. :x:`,
        );
    }
}

/**
 * Handler for "react remove [name]".
 *
 * Removes the reaction with the given name from the bot. Afterwards sends
 * back success/error message to channel where the command was called.
 *
 * This function requires the user calling it to be in the settings.json admin_list.
 *
 * @param {String} name The name of the emote to be added.
 * @param {Discord.Message} message: The message which called the command.
 */
function removeReaction(name: string, message: Discord.Message): void {
    const admins = settings.admin_list;
    const author = message.author;
    const channel = message.channel;

    // Retrieves all filenames in reaction image folder and finds the file specified.
    const availableReactions = io.getReactionImages();
    let reactionFilename = availableReactions.find((file) => file.split(".")[0] === name);

    // Check if user is in the admin list in settings.json.
    if (!admins.includes(author.id)) {
        channel.send(`:x: Sorry ${author}, this command can only be run by an administrator. :x:`);
        return;
    }

    // Assure filename is safe and not PathLike
    if (reactionFilename) {
        reactionFilename = Path.basename(reactionFilename);
    }

    // Creates the file if it was not found, otherwise sends error message.
    if (reactionFilename !== undefined) {
        fs.unlinkSync(reactImgFolder + reactionFilename);

        channel.send(`:white_check_mark: Removed reaction \`${name}\`! :white_check_mark:`);
    } else {
        channel.send(`${author}.\n\n:x: The reaction \`${name}\` does not exist. :x:`);
    }
}

export default react;
