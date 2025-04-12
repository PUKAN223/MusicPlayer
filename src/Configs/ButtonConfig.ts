import type Button from "../Interfaces/Buttons";
import type Command from "../Interfaces/Commands"
import autoplay from "./InteractionCallBack/Buttons/autoplay";
import loop from "./InteractionCallBack/Buttons/loop";
import pause from "./InteractionCallBack/Buttons/pause";
import play from "./InteractionCallBack/Buttons/play";
import queue from "./InteractionCallBack/Buttons/queue";
import skip from "./InteractionCallBack/Buttons/skip";
import stop from "./InteractionCallBack/Buttons/stop";
import volume from "./InteractionCallBack/Buttons/volume";
import ping from "./InteractionCallBack/Commands/ping";
import setup from "./InteractionCallBack/Commands/setup"

const ButtonRegister: Array<Button> = [
    {
        id: "play",
        exec: (interaction) => play.callback(interaction)
    },
    {
        id: "pause",
        exec: (interaction) => pause.callback(interaction)
    },
    {
        id: "skip",
        exec: (interaction) => skip.callback(interaction)
    },
    {
        id: "stop",
        exec: (interaction) => stop.callback(interaction)
    },
    {
        id: "queue",
        exec: (interaction) => queue.callback(interaction)
    },
    {
        id: "volume",
        exec: (interaction) => volume.callback(interaction)
    },
    {
        id: "loop",
        exec: (interaction) => loop.callback(interaction)
    },
    {
        id: "autoplay",
        exec: (interaction) => autoplay.callback(interaction)
    }
]

export default ButtonRegister;