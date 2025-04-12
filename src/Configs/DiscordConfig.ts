import dotenv from "dotenv";
import Logger from "../Utilities/Logger";
import path from "path"

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    Logger.error(`Missing Token or Client ID`);
    process.exit(1);
}

const CHANNEL_DATA_PATH = "C:\\Users\\KisuX3\\Documents\\MusicPlayer\\src\\Configs\\DB\\channelData.json"

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    CHANNEL_DATA_PATH
};
