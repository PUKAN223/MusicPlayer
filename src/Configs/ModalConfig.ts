import type Modal from "../Interfaces/Modals";
import play_link from "./InteractionCallBack/Modals/play_link";
import search_name from "./InteractionCallBack/Modals/search_name";

const ModalRegister: Array<Modal> = [
    {
        id: "play_link",
        exec: (interaction) => play_link.callback(interaction)
    },
    {
        id: "search_name",
        exec: (interaction) => search_name.callback(interaction)
    }
]

export default ModalRegister;