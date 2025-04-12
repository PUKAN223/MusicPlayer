import { Events } from "distube";
import { connection } from "../../Index";
import { functions } from "../../Configs/InteractionCallBack/Commands/setup";
import { getChannelData } from "../../Configs/DB/Index";
import { deleteAllMessages } from "../../Utilities/DeleteAllMessage";
import type { Channel, GuildMember } from "discord.js";
import { setEmbed } from "../../Utilities/Setup";

connection.on(Events.FINISH, (queue) => {
    const channelData = getChannelData();
    const channel = connection.client.channels.cache.get(channelData[queue.clientMember?.guild.id as string] as string);
    setEmbed(queue, channel as Channel);
});