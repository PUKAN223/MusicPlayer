import type { Queue } from "distube";
import { getChannelData } from "../Configs/DB/Index";
import { client, connection } from "../Index";
import type { Channel, GuildMember } from "discord.js";
import { deleteAllMessages } from "./DeleteAllMessage";
import { functions } from "../Configs/InteractionCallBack/Commands/setup";

export async function setEmbed(queue: Queue, channel: Channel) {
    if (!channel) return;
    await deleteAllMessages(channel);
    functions.uiChannels(channel.id);  
}