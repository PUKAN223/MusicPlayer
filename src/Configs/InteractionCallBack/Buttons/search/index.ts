import type { ButtonInteraction, CommandInteraction } from "discord.js";

function search(interaction: ButtonInteraction) {
    interaction.reply("Pong!");
}

export default { callback: search }