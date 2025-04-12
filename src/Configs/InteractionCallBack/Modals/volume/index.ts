import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Guild, quote, type GuildMember, type GuildTextBasedChannel, type ModalSubmitInteraction, type VoiceBasedChannel } from "discord.js";
import { client, connection, currentSong } from "../../../../Index";

async function volumeSet(interaction: ModalSubmitInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)
    if (queue) {
        await interaction.deferUpdate();
        const volume = interaction.fields.getField("volume_input").value;
        if (volume) {
            connection.setVolume(interaction.guild as Guild, parseInt(volume));
            const time = queue.currentTime;
            queue.play()
            queue.seek(time);
            const MusicSet = new EmbedBuilder()
                .setColor(0x00FF00)
                .setDescription(`Volume set to ${queue.volume}`)
                .setTimestamp()
                .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
            await queue?.textChannel?.send({ embeds: [MusicSet] });
        }
    }
}

export default { callback: volumeSet };
