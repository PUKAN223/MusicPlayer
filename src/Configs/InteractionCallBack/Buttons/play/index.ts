import { ModalBuilder, TextInputBuilder, TextInputStyle, type ButtonInteraction, type CommandInteraction } from "discord.js";
import { ModalCreater } from "../../../../Utilities/ModalCreater";

function play(interaction: ButtonInteraction) {
    const ModalCreate = new ModalCreater(
        new ModalBuilder().setTitle("Music Players").setCustomId("play_song"),
        [
            new TextInputBuilder().setCustomId("song_input").setLabel("Song Name or Links").setPlaceholder("Please Enter name or links.").setStyle(TextInputStyle.Short)
        ]
    )
    ModalCreate.showModal(interaction)
}

export default { callback: play }