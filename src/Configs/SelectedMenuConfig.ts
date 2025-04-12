import type { CacheType, StringSelectMenuInteraction } from "discord.js";
import type Modal from "../Interfaces/Modals";
import type SelectMenu from "../Interfaces/SelectMenus";
import play_song from "./InteractionCallBack/Modals/playSong";
import queueSelected from "./InteractionCallBack/SelectedMenu/queueSelected";

const SelectMenuRegister: Array<SelectMenu> = [
    {
        id: "queueSelect",
        exec: (interaction) => queueSelected.callback(interaction)
    }
]

export default SelectMenuRegister;