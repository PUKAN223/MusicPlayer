import { ActionRowBuilder, Guild, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuComponent, TextInputBuilder, TextInputStyle, type ActionRowComponent, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { SelectMenuCreater } from "../../../../Utilities/SelectMenuCreater";
import { connection } from "../../../../Index";

async function queue(interaction: ButtonInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)

    if (queue) {
        const options = queue.songs.map((song, index) => ({
            label: song.name as string,
            value: index.toString()
        }));
        const SelectMenu = new SelectMenuCreater(
            new StringSelectMenuBuilder().setCustomId("queueSelect").setPlaceholder("View or Select Song to play.").setOptions(options)
        )

        const reply = await interaction.reply({ components: [SelectMenu.getMenu() as ActionRowBuilder<StringSelectMenuBuilder>], flags: ["Ephemeral"] })
        setTimeout(() => {
            if (reply) reply.delete()
        }, 10000)
    }
}

export default { callback: queue }
