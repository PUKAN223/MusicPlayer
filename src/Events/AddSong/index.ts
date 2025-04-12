import { Events } from "distube";
import { connection } from "../../Index";
import { deleteAllMessages } from "../../Utilities/DeleteAllMessage";
import { displaySong } from "../../Utilities/DisplaySong";
import type { GuildTextBasedChannel } from "discord.js";

connection.on(Events.ADD_SONG, async (queue, song) => {
    await deleteAllMessages(queue.textChannel as GuildTextBasedChannel);
    await displaySong(queue, queue.textChannel as GuildTextBasedChannel); 
});