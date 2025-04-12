import { Colors, EmbedBuilder, Guild, ModalBuilder, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { client, connection } from "../../../../Index";

async function pause(interaction: ButtonInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)

    if (queue) {
        if (!queue.isPaused()) {
            await queue.pause();
        } else {
            await queue.resume();
        }
        const MusicSet = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setDescription(`${queue.isPaused() ? "⏸ Paused" : "▶ Resumed"}`)
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
        const msg = await queue?.textChannel?.send({ embeds: [MusicSet] });
        const reply = await interaction.deferReply({ flags: ["Ephemeral"] });
        reply.delete()
        setTimeout(() => {
            if (!msg) return; 
            msg?.delete();
        }, 5000);
    }
}

export default { callback: pause }