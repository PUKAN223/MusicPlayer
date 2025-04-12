import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, type GuildMember, type GuildTextBasedChannel, type ModalSubmitInteraction, type VoiceBasedChannel } from "discord.js";
import type { Song } from "distube";
import { client, connection } from "../../../../Index";
import { getChannelData } from "../../../DB/Index";

async function play_song(interaction: ModalSubmitInteraction) {
    const member = interaction.member as GuildMember;
    const channelData = getChannelData();
    const channel = client.channels.cache.get(channelData[member.guild.id as string] as string);
    if (!channel) {
        const channelEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("Music channel not found. Please use /setup command to create one.")
            .setTimestamp();
        const msg = await interaction.reply({ embeds: [channelEmbed], flags: ["Ephemeral"] });  
        setTimeout(() => {
            if (!msg) return; 
            msg?.delete();
        }, 5000);
        return;
    } else if (channel.isTextBased()) {
        const typing = await interaction.deferReply({ flags: ["Ephemeral"] });
        await typing.delete();
        
        if (!member.voice.channel) {
            const voiceEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("Please join a voice channel first!")
                .setTimestamp();
            const msg = await (client.channels.cache.get(channel.id) as GuildTextBasedChannel)?.send({ embeds: [voiceEmbed] });
            setTimeout(() => {
                if (!msg) return; 
                msg?.delete();
            }, 5000);
            return;
        }

        const voice = member.voice.channel as VoiceBasedChannel;
        const input = interaction.fields.getField("song_input").value.trim();

        if (!input) {
            const emptyEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("Please enter a search query or YouTube link.")
                .setTimestamp();
            const msg = await (client.channels.cache.get(channel.id) as GuildTextBasedChannel)?.send({ embeds: [emptyEmbed] });
            setTimeout(() => {
                if (!msg) return; 
                msg?.delete();
            }, 5000);
            return;
        }

        try {
            const loadingEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setDescription(`Processing song: ${input}`)
                .setTimestamp();
            const msg = await (client.channels.cache.get(channel.id) as GuildTextBasedChannel)?.send({ embeds: [loadingEmbed] });

            await connection.play(voice, input, {
                member,
                textChannel: interaction.channel as GuildTextBasedChannel,
                metadata: { interaction }
            });
            msg.delete();
        } catch (error) {
            console.error("Error in play_song modal:", error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("An error occurred while processing your request.")
                .setTimestamp();
            const msg = await (client.channels.cache.get(channel.id) as GuildTextBasedChannel)?.send({ embeds: [errorEmbed] });
            msg.delete();
        }
    }
}

export default { callback: play_song };
