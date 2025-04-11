import { ModalBuilder, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";

function play(interaction: ButtonInteraction) {
    const ModalCreate = new ModalCreater(
        new ModalBuilder().setTitle("Links?").setCustomId("play_link"),
        [
            new TextInputBuilder().setCustomId("yt_input_links").setLabel("Youtube Links").setPlaceholder("Please Enter Youtube Links.").setStyle(TextInputStyle.Short)
        ]
    )
    ModalCreate.showModal(interaction)
}

export default { callback: play }