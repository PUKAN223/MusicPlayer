import { client, startedTime } from "../../";
import Logger from "../../Utilities/Logger";
import { registerCommands } from "../../Utilities/RegisterCommands";

client.once("ready", (client) => {
    Logger.start(`${client.user?.tag} is ${"online!".green}`);
    Logger.time(`${client.user?.tag} is ready in ${String(Date.now() - startedTime).green}${"ms".gray}`);
    registerCommands(client);
})