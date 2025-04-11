import { client } from "../..";
import ButtonRegister from "../../Configs/ButtonConfig";
import CommandRegister from "../../Configs/CommandConfig";
import ModalRegister from "../../Configs/ModalConfig";

client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;
        if (CommandRegister.some(x => x.name == commandName)) {
            CommandRegister.find(x => x.name == commandName)?.exec(interaction);
        }
    } else if (interaction.isButton()) {
        const { customId: buttonId } = interaction;
        if (ButtonRegister.some(x => x.id == buttonId)) {
            ButtonRegister.find(x => x.id == buttonId)?.exec(interaction);
        }
    } else if (interaction.isModalSubmit()) {
        const { customId: modalId } = interaction;
        if (ModalRegister.some(x => x.id == modalId)) {
            ModalRegister.find(x => x.id == modalId)?.exec(interaction);
        }
    }
});