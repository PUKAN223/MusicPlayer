import { ChannelType, Colors, EmbedBuilder, PermissionFlagsBits, type CommandInteraction, type GuildMember, TextChannel, ActionRowBuilder, ButtonBuilder, InteractionResponse } from "discord.js";
import { client } from "../../../../Index";
import { getChannelData, saveChannelData } from "../../../DB/Index";

async function setup(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
        const noPermEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("You need to be a server administrator to use this command.")
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
        await interaction.reply({ embeds: [noPermEmbed], flags: ["Ephemeral"] });
        return;
    }

    const guildId = interaction.guild?.id;
    if (!guildId) {
        await interaction.reply({ content: "This command can only be used in a server.", flags: ["Ephemeral"] });
        return;
    }

    const channelData = getChannelData();
    if (channelData[guildId]) {
        const existingChannel = interaction.guild?.channels.cache.get(channelData[guildId]);
        if (existingChannel) {
            const existingEmbed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(`Music channel already exists: <#${channelData[guildId]}>`)
                .setTimestamp()
                .setFooter({ iconURL: interaction.user.avatarURL() as string, text: "KT Music" });
            await interaction.reply({ embeds: [existingEmbed], flags: ["Ephemeral"] });
            return;
        }
    }

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
        saveChannelData(guildId, channel.id);

        const channelCreate = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`Music channels created successfully. <#${channel.id}>`)
            .setTimestamp()
            .setFooter({ iconURL: interaction.user.avatarURL() as string, text: "KT Music" });
        await interaction.reply({ embeds: [channelCreate], flags: ["Ephemeral"] });
        functions.uiChannels(channel.id);
    });
}

export const functions = {
    uiChannels: (id: string) => {
        const uiChannels = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription(`### Use play button below to play music\nคลิกปุ่ม play เพื่อเล่นเพลง`)
            .setImage("https://cdn.discordapp.com/attachments/989165681608105994/1360482647092101160/image.png?ex=67fb47b3&is=67f9f633&hm=1044f0eeedcf48d4de86d5b479fe46b4234aca136fa578bd66249935a6634d52&")
            .setTimestamp();

        const playButton = new ButtonBuilder()
            .setLabel("Play")
            .setStyle(1)
            .setCustomId("play");

        const buttons = new ActionRowBuilder()
            .addComponents(playButton);

        (client.channels.cache.get(id) as TextChannel)?.send({ embeds: [uiChannels], components: [buttons as ActionRowBuilder<ButtonBuilder>] });
    }
};


export default { callback: setup };