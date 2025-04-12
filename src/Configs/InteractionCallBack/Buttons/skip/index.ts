import { Colors, EmbedBuilder, Guild, ModalBuilder, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { client, connection } from "../../../../Index";

async function skip(interaction: ButtonInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)

    if (queue) {
        if (queue.songs.length === 1 && !queue.autoplay) {
            const reply = await interaction.deferReply({ flags: ["Ephemeral"] });
            reply.delete()
            const emptyEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription("There are no more songs in the queue.")
                .setTimestamp();
            const msg = await queue?.textChannel?.send({ embeds: [emptyEmbed] });
            setTimeout(() => {
                if (!msg) return; 
                msg?.delete();
            }, 5000);
            return;
        }
        const song = await queue.skip();
        const MusicSet = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setDescription(`Skiped ${song.name}`)
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
        await queue?.textChannel?.send({ embeds: [MusicSet] });
        const reply = await interaction.deferReply({ flags: ["Ephemeral"] });
        reply.delete()
    }
}

export default { callback: skip }