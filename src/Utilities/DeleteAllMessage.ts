import { GuildMember, PermissionsBitField, type Channel } from "discord.js";
import Logger from "./Logger";

export async function deleteAllMessages(channel: Channel) {
    if (!channel?.isTextBased() || channel.isDMBased()) {
        throw new Error('This function can only be used in guild text channels or threads.');
    }

    let deletedCount = 0;

    try {
        const messages = await channel.messages.fetch({ limit: 100 });

        if (messages.size === 0) return;

        try {
            const deleted = await channel.bulkDelete(messages, true);
            deletedCount += deleted.size;
            Logger.info(`Bulk deleted ${deleted.size} messages.`);
        } catch (error) {
            for (const msg of messages.values()) {
                try {
                    if (msg) {
                        await msg.delete();
                        deletedCount++;
                        Logger.info(`Individually deleted a message.`);
                    }
                } catch (err) {
                    Logger.error(`Failed to delete message ${msg.id}: ${err}`);
                }
            }
        }

        Logger.info(`Finished: Cleared ${deletedCount}`);
        return deletedCount;
    } catch (error) {
        Logger.error('Error in deleteAllMessages: ' + error);
        process.exit(1);
    }
}