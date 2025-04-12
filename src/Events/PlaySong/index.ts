import { Events, type DisTubeEvents, type Queue, type Song } from "distube";
import { connection } from "../../Index";
import { getChannelData } from "../../Configs/DB/Index";
import { deleteAllMessages } from "../../Utilities/DeleteAllMessage";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, type GuildMember, type GuildTextBasedChannel } from "discord.js";
import { displaySong } from "../../Utilities/DisplaySong";

connection.on(Events.PLAY_SONG, async (queue: Queue, song: Song) => {
    await deleteAllMessages(queue.textChannel as GuildTextBasedChannel);;
    await displaySong(queue, queue.textChannel as GuildTextBasedChannel);
});