import type Button from "../Interfaces/Buttons";
import type Command from "../Interfaces/Commands"
import play from "./InteractionCallBack/Buttons/play";
import search from "./InteractionCallBack/Buttons/search";
import ping from "./InteractionCallBack/Commands/ping";
import setup from "./InteractionCallBack/Commands/setup"

const ButtonRegister: Array<Button> = [
    {
        id: "play",
        exec: (interaction) => play.callback(interaction)
    },
    {
        id: "search",
        exec: (interaction) => search.callback(interaction)
    }
]

export default ButtonRegister;