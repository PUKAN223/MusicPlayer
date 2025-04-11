import { ChannelType, Colors, EmbedBuilder, PermissionFlagsBits, type CommandInteraction, type GuildMember, TextChannel, ActionRow, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { client } from "../../../..";

async function setup(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
        await interaction.guild?.channels.create({
            name: "🏙．ᴋᴛ ᴍᴜꜱɪᴄ",
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild?.roles.everyone.id,
                    deny: ["ViewChannel"]
                },
                {
                    id: interaction.user.id,
                    allow: ["ViewChannel"]
                }
            ]
        }).then(async (channel) => {
            const channelCreate = new EmbedBuilder()
                .setColor(Colors.Green)
                .setDescription(`Music channels created successfully. <#${channel.id}>`)
                .setTimestamp()
                .setFooter({ iconURL: interaction.user.avatarURL() as string, text: "KT Music" })
            await interaction.reply({ embeds: [channelCreate], ephemeral: true });
            functions.uiChannels(channel.id)
        })
    } else {
        const noPermEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("You need to be a server administrator to use this command.")
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" })
        await interaction.reply({ embeds: [noPermEmbed], ephemeral: true });
    }
}

const functions = {
    uiChannels: (id: string) => {
        const uiChannels = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription(`### Use play or search buttons below to play music\nคลิกปุ่ม play หรือ search เพื่อเล่นเพลง`)
            .setImage("https://i.pinimg.com/originals/ec/d6/72/ecd67255b08380eb534d3f8ee397bc85.gif")
            .setTimestamp()

        const playButton = new ButtonBuilder()
            .setLabel("Play")
            .setStyle(1)
            .setCustomId("play");

        const searchButton = new ButtonBuilder()
            .setLabel("Search")
            .setStyle(1)
            .setCustomId("search");

        const buttons = new ActionRowBuilder()
            .addComponents(playButton, searchButton);

        (client.channels.cache.get(id) as TextChannel)?.send({ embeds: [uiChannels], components: [buttons as ActionRowBuilder<ButtonBuilder>] })
    }
}

export default { callback: setup }
