import { Events } from "distube";
import { connection } from "../Index";

const EventRegister = {
    Ready: import("./Ready"),
    Interaction: import("./Interaction"),
    PlaySong: import("./PlaySong"),
    Finish: import("./Finish"),
    AddSong: import("./AddSong")
};

export default EventRegister;
