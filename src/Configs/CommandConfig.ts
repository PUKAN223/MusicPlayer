import type Command from "../Interfaces/Commands"
import ping from "./InteractionCallBack/Commands/ping";
import setup from "./InteractionCallBack/Commands/setup"

const CommandRegister: Array<Command> = [
    {
        name: "ping",
        description: "Use this for test commands!",
        exec: (interaction) => ping.callback(interaction)
    },
    {
        name: "setup",
        description: "Use this command to create music channels",
        exec: (interaction) => setup.callback(interaction)
    }
]

export default CommandRegister;