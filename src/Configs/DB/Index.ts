import * as fs from "fs"
import { config } from "../DiscordConfig";
import type ChannelData from "../../Interfaces/ChannelData";
import Logger from "../../Utilities/Logger";
import { dirname } from "path";

export function ensureDBExists() {
    if (!fs.existsSync(config.CHANNEL_DATA_PATH)) {
        fs.writeFileSync(config.CHANNEL_DATA_PATH, JSON.stringify({}, null, 2));
    }
}

export function getChannelData(): ChannelData {
    ensureDBExists();
    const data = fs.readFileSync(config.CHANNEL_DATA_PATH, 'utf-8');
    return JSON.parse(data);
}

export function saveChannelData(guildId: string, channelId: string) {
    const data = getChannelData();
    data[guildId] = channelId;
    fs.writeFileSync(config.CHANNEL_DATA_PATH, JSON.stringify(data, null, 2));
}