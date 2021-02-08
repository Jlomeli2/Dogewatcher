# Fika Bot (PLACEHOLDER)

An all-around bot for the Fikabröd Discord server.

## Table of Content

1. [Features](#features)\
&nbsp; <!-- Indent -->
1.1. [Feature List](#feature-list)\
&nbsp; <!-- Indent -->
1.2. [Command List](#command-list)
2. [Pre-requisites](#pre-requisites)
3. [Installation](#installation)
4. [Configuration](#configuration)\
&nbsp; <!-- Indent -->
4.1. [.env](#dotenv)\
&nbsp; <!-- Indent -->
4.2. [settings.json](#settings-json)

## 1. Features
<a name="features"></a>

The PLACEHOLDER Bot is an all-around bot which
features a little bit of everything. Features
are mostly added upon request and are aimed
towards the need of the Fikabröd Discord server.

### 1.1. Feature List
<a name="feature-list"></a>

* Spice up your emojis by using full reaction images/videos.

### 1.2. Command List
<a name="command-list"></a>

You can find the descriptions and usage instructions for commands [here](https://github.com/EpiX0R/fika_bot/blob/master/COMMANDS.md).


## 2. Pre-requisites
<a name="pre-requisites"></a>

To be able to use the bot the following software and tools are needed:

* [Node.js](https://nodejs.org)
* [npm](https://www.npmjs.com/get-npm)


## 3. Installation
<a name="installation"></a>

1. Clone/download this repository
2. Run `npm install`
3. Run `npm build`
4. Run `npm start`


## 4. Configuration
<a name="configuration"></a>

Rename the `template.env` to `.env`. You can the edit the core bot settings in the `.env` file.

Rename the `settings_template.json` to `settings.json` in the `src/` folder.

### 4.1. .env
<a name="dotenv"></a>

You are required to edit the following variables in the `.env` file:
* `DISCORD_TOKEN`: To your [Discord Bot Token](https://discord.com/developers).

The following core settings can be changed in the .env file:

* `DISCORD_TOKEN`: Your [Discord Bot Token](https://discord.com/developers).
* `COMMAND_PREFIX`: The prefix to use for your commands.
* `DEV_ID`: The only Discord UserID the bot will listen to when run in dev mode.

### 4.2. settings.json
<a name="settings-json"></a>

The following settings can be changed in the settings.json file:

* `admin_list`: A list consisting of Discord UserID's which will be able to use admin-only commands.