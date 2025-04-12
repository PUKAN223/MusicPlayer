import type Modal from "../Interfaces/Modals";
import play_song from "./InteractionCallBack/Modals/playSong";
import volume from "./InteractionCallBack/Modals/volume";
const ModalRegister: Array<Modal> = [
    {
        id: "play_song",
        exec: (interaction) => play_song.callback(interaction)
    },
    {
        id: "volume",
        exec: (interaction) => volume.callback(interaction)
    }
]

export default ModalRegister;