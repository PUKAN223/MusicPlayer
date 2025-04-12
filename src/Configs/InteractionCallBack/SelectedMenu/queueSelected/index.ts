import { Colors, EmbedBuilder, Guild, ModalBuilder, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { client, connection } from "../../../../Index";
import Logger from "../../../../Utilities/Logger";
import type { Song } from "distube";

async function queueSelected(interaction: StringSelectMenuInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)
    if (queue) {
        await interaction.deferUpdate();
        const selectedIndex = parseInt(interaction.values[0] as string)
        if (selectedIndex == 0) {
            queue.play()
        } else {
            await queue.jump(selectedIndex);
        }

        const MusicSet = new EmbedBuilder()
            .setColor(Colors.Purple)
            .setDescription(`Jumped to song ${queue.songs[selectedIndex]?.name}`)
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });

        await queue?.textChannel?.send({ embeds: [MusicSet] });
    }
}

export default { callback: queueSelected }