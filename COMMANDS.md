# Commands

Here are all the commands supported by the bot. This documentation explains usage and gives examples on certain commands.

* All commands are to be preceded by the command prefix set up in the `.env` file.

* Commands that has the `[ADMIN]` tag can only be used by a bot admin. (See [bot documentation](https://github.com/EpiX0R/fika_bot))

* Parameters that begin with a question mark (`<?parameter>`) is an optional paramter.

Report any bugs here: [EpiX0R/fika_bot Issues on GitHub](https://github.com/EpiX0R/fika_bot/issues).

## help

Sends a help message in DM's.

Usage:
* `help` - Sends a help message in DM's to the user executing the command.

## react
Allows you to use reaction images.

Usage:
* `[ADMIN]` `react add <name>` - Adds a new reaction to use with the `<name>`. Adds the file attached with the message executing the message.
* `[ADMIN]` `react remove <name>` - Removes the reaction `<name>`.
* `react <name>` - Sends the reaction `<name>`.

## poll
Allows you to manage polls.

Usage:
* `poll` - Displays all current polls in the format of `<id> - <title>`
* `poll <id>` - Displays the results of the poll `<id>`.
* `[ADMIN]` `poll create <?date> <time> <title> <answers>` - Creates a new poll with a `<title>` that lasts until the `<time>` specified on the `<date>` specified. If no `<date>` is specified the time is assumed to be at the current date.

    The `<?date>` is optional. If used it should be a dash separated string in the format of `YYYY-MM-DD` (`2020-11-25`).

    The `<time>` should be a colon separated string in the format of `HH:MM` (`16:35`).

    The `<title>` should be enclosed in ellipsises (`"Is this a question?"`).
    
    The answers should be space separated discord emojis enclosed in brackets (`[:red_circle: :green_circle:]`)  

    Example: 
    
        poll create 2020-11-25 16:35 "Is this a question?" [:red_circle: :green_circle:]

* `[ADMIN]` `poll delete <id>` - Deletes the poll with the `<id>`.
