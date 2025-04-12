import { Colors, EmbedBuilder, Guild, ModalBuilder, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { client, connection } from "../../../../Index";

async function stop(interaction: ButtonInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)

    if (queue) {
        await queue.stop();
        const MusicSet = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setDescription(`Stoped.`)
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
        await queue?.textChannel?.send({ embeds: [MusicSet] });
        const reply = await interaction.deferReply({ flags: ["Ephemeral"] });
        reply.delete()
    }
}

export default { callback: stop }