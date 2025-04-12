import { ActionRowBuilder, Guild, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuComponent, TextInputBuilder, TextInputStyle, type ActionRowComponent, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";
import { SelectMenuCreater } from "../../../../Utilities/SelectMenuCreater";
import { connection } from "../../../../Index";

async function queue(interaction: ButtonInteraction) {
    const queue = connection.getQueue(interaction.guild as Guild)

    if (queue) {
        const modal = new ModalBuilder()
            .setTitle("Volume")
            .setCustomId("volume")
            .addComponents(
                new ActionRowBuilder<TextInputBuilder>()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId("volume_input")
                            .setLabel("Volume")
                            .setPlaceholder("Please enter a number between 0 and 100.")
                            .setStyle(TextInputStyle.Short)
                    )
            );

        await interaction.showModal(modal);
    }
}

export default { callback: queue }
