import * as Discord from "discord.js";
import fs from "fs";
import https from "https";

const reactImgFolder = "./assets/img/reaction/";

/**
 * Saves all the files contained within a Discord attachment collection.
 *
 * @param {fs.PathLike} destination The destination of the files to be saved.
 * @param {Discord.Collection<Discord.Snowflake, Discord.MessageAttachment>} attachments The Discord collection containing the attachments to be saved.
 */
export function saveDiscordMessageAttachments(
    name: string,
    destination: fs.PathLike,
    attachments: Discord.Collection<Discord.Snowflake, Discord.MessageAttachment>,
): void {
    const attachmentArray = attachments.array();

    attachmentArray.forEach((attachment) => {
        const url = attachment.url;
        const extension = attachment.url.split(".").pop();

        // Download the attached file.
        https.get(url, function (response) {
            response.pipe(
                // Write to destination.
                fs.createWriteStream(destination + name + "." + extension, {
                    autoClose: true,
                }),
            );
        });
    });
}

/**
 * Retrieves all filenames from the reaction image folder.
 *
 * @returns {string[]} The filenames as strings in an array.
 */
export function getReactionImages(): string[] {
    const files = fs.readdirSync(reactImgFolder);

    return files;
}
