import { Client, Guild, type VoiceBasedChannel } from "discord.js";
import DisTube, { DisTubeVoice, DisTubeVoiceManager, Queue, Song } from "distube";
import { config } from "./Configs/DiscordConfig";
import EventRegister from "./Events";
import { youtubePlugin } from "./Plugins/YoutubePlugins";
import { getChannelData, saveChannelData } from "./Configs/DB/Index";
import { setEmbed } from "./Utilities/Setup";
import Logger from "./Utilities/Logger";

export const startedTime = Date.now();

export const client = new Client({
    intents: [
        "GuildMembers",
        "Guilds",
        "GuildMessages",
        "GuildMessageTyping",
        "GuildVoiceStates",
        "MessageContent"
    ]
});

export const connection = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [youtubePlugin],
    savePreviousSongs: true,
    nsfw: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false
});

export const currentSong = new Map<string, Song>();

client.login(config.DISCORD_TOKEN).finally(() => {
    client.user?.setPresence({
        activities: [{ name: "Music Player", type: 0 }],
        status: "online"
    });
    EventRegister.Ready;
    EventRegister.Interaction;
    EventRegister.AddSong;
    EventRegister.Finish;
    EventRegister.PlaySong;
})
