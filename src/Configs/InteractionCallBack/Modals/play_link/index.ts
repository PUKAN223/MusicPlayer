import { EmbedBuilder, type GuildMember, type GuildTextBasedChannel, type ModalSubmitInteraction, type VoiceBasedChannel } from "discord.js";
import { connection } from "../../../..";
import type { Song } from "distube";

async function play_link(interaction: ModalSubmitInteraction) {
    const member = interaction.member as GuildMember;
    if (!member.voice.channel) {
        const voiceEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("Please join a voice channel first!")
            .setTimestamp();
        await interaction.reply({ embeds: [voiceEmbed], ephemeral: true });
        return;
    }

    const voice = member.voice.channel as VoiceBasedChannel;
    const input = interaction.fields.getField("yt_input_links").value.trim();

    if (!input) {
        const emptyEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("Please enter a search query or YouTube link.")
            .setTimestamp();
        await interaction.reply({ embeds: [emptyEmbed], ephemeral: true });
        return;
    }

    await interaction.deferReply();

    try {
        const loadingEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setDescription("Processing your request...")
            .setTimestamp();
        await interaction.editReply({ embeds: [loadingEmbed] });

        await connection.play(voice, input, {
            member,
            textChannel: interaction.channel as GuildTextBasedChannel,
            metadata: { interaction }
        });
        const queue = connection.getQueue(member.guild.id)

        if (queue && queue.songs.length > 0) {
            const lastSong = queue.songs[queue.songs.length - 1] as Song
            if (lastSong.playlist) {
                const playlist = lastSong.playlist;
                const successEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setDescription(`Added playlist: ${playlist.name} with ${playlist.songs.length} songs`)
                    .setTimestamp();
                await interaction.editReply({ embeds: [successEmbed] });
            } else {
                const successEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setDescription(`Added to queue: ${lastSong.name}`)
                    .setTimestamp();
                await interaction.editReply({ embeds: [successEmbed] });
            }
        }
    } catch (error) {
        console.error("Error in play_link modal:", error);
        const errorEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("An error occurred while processing your request.")
            .setTimestamp();
        await interaction.editReply({ embeds: [errorEmbed] });
    }
}

export default { callback: play_link };