import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, type Channel, type GuildTextBasedChannel } from "discord.js";
import type { Queue, Song } from "distube";

export async function displaySong(queue: Queue, channel: Channel) {
    if (queue && queue.songs.length > 0) {
        const currentSong = queue.songs[0] as Song;
        const lastSong = queue.songs[queue.songs.length - 1] as Song;

        const button_rows_1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('play')
                    .setLabel('▶ Add Song')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('⏯ Pause/Resume')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setLabel('⏭ Skip')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setLabel('⏹ Stop')
                    .setStyle(ButtonStyle.Danger),
            );
        const button_rows_2 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('queue')
                    .setLabel('⏏ Queue')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('volume')
                    .setLabel('🕪 Volume')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('loop')
                    .setLabel('↺ Loop')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('autoplay')
                    .setLabel('↪ Autoplay')
                    .setStyle(ButtonStyle.Secondary),
            )

        if (lastSong.playlist) {
            const playlist = lastSong.playlist;
            const successEmbed = new EmbedBuilder()
                .setColor(Colors.Blue)
                .setTitle('𝆕 Now Playing')
                .setDescription(`Added playlist: ${playlist.name}`)
                .addFields(
                    { name: "Current Song", value: currentSong.name as string, inline: true },
                    { name: 'Duration', value: `${currentSong.formattedDuration}`, inline: true },
                    { name: 'Requested By', value: `<@${currentSong.user?.id}>`, inline: true },
                    { name: 'Queue Length', value: `${queue.songs.length} songs`, inline: true },
                    { name: 'Playlist', value: playlist.name || 'Unknown', inline: true }
                )
                .setThumbnail(currentSong.thumbnail as string)
                .setImage("https://cdn.discordapp.com/attachments/989165681608105994/1360482647092101160/image.png?ex=67fb47b3&is=67f9f633&hm=1044f0eeedcf48d4de86d5b479fe46b4234aca136fa578bd66249935a6634d52&")
                .setTimestamp();
            await (channel as GuildTextBasedChannel).send({ embeds: [successEmbed], components: [button_rows_1, button_rows_2] });
        } else {
            const successEmbed = new EmbedBuilder()
                .setColor(Colors.Blue)
                .setTitle('𝆕 Now Playing')
                .setDescription(currentSong.name as string)
                .addFields(
                    { name: 'Duration', value: currentSong.formattedDuration, inline: true },
                    { name: 'Requested By', value: `<@${currentSong.user?.id}>`, inline: true },
                    { name: 'Author', value: currentSong.uploader.name || 'Unknown', inline: true },
                    { name: `Queue Position: ${queue.songs.length}`, value: ``, inline: false }
                )
                .setThumbnail(currentSong.thumbnail as string)
                .setImage("https://cdn.discordapp.com/attachments/989165681608105994/1360482647092101160/image.png?ex=67fb47b3&is=67f9f633&hm=1044f0eeedcf48d4de86d5b479fe46b4234aca136fa578bd66249935a6634d52&")
                .setTimestamp();
            await (channel as GuildTextBasedChannel).send({ embeds: [successEmbed], components: [button_rows_1, button_rows_2] });
        }
    }
}