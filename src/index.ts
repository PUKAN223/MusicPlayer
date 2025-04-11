import { Client, type VoiceBasedChannel } from "discord.js";
import DisTube, { DisTubeVoice, DisTubeVoiceManager, ExtractorPlugin, PlayableExtractorPlugin, Queue, Song } from "distube";
import { config } from "./Configs/DiscordConfig";
import EventRegister from "./Events";
import { YouTubePlugin } from "@distube/youtube";
import { youtubePlugin } from "./Plugins/YoutubePlugins";

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
})

export const connection = new DisTube(client, { emitNewSongOnly: true, plugins: [youtubePlugin] });
export const queue = (channel: VoiceBasedChannel, song: Array<Song>) => new Queue(connection, new DisTubeVoice(new DisTubeVoiceManager(connection), channel))
export const currentSong = new Map<string, Song>()

client.login(config.DISCORD_TOKEN).finally(() => {
    client.user?.setPresence({
        activities: [{ name: "Music Player", type: 0 }],
        status: "online"
    })
    EventRegister.Ready;
    EventRegister.Interaction;
})
