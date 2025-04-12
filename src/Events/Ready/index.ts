import type { Guild } from "discord.js";
import { getChannelData } from "../../Configs/DB/Index";
import { client, connection, startedTime } from "../../Index";
import Logger from "../../Utilities/Logger";
import { registerCommands } from "../../Utilities/RegisterCommands";
import { setEmbed } from "../../Utilities/Setup";
import type { Queue } from "distube";

client.once("ready", (client) => {
    Logger.start(`${client.user?.tag} is ${"online!".green}`);
    Logger.time(`${client.user?.tag} is ready in ${String(Date.now() - startedTime).green}${"ms".gray}`);
    registerCommands(client);
    const channelData = getChannelData();
    for (const guildId in channelData) {
        const channelId = channelData[guildId] as string;
        const channel = client.channels.cache.get(channelId);
        if (channel && channel.isTextBased()) {
            const queue = connection.getQueue(client.guilds.cache.get(guildId) as Guild);
            setEmbed(queue as Queue, channel);
        }
    }
})