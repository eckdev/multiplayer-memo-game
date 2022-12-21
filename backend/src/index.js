import { Status } from "./util";

function onRoomStart() {
    return {
        state: {
            status: Status.PreGame,
            winner: null,
            playerSelectedValue: null
        }
    }
}

function onPlayerJoin(player,roomState) {
    const {players,state} = roomState;
    if (players.lenght === 2) {
        state.status = Status.InGame;
        return {
            state,
            joinable: false
        }
    }
    return {}
}

function onPlayerMove(player,move,roomState) {
    const {players,state} = roomState;
    const value = move;

    if (state !== Status.InGame) {
        throw new Error("game is not in progress")
    }
    
}

export default {
    onRoomStart,
    onPlayerJoin,
    onPlayerMove
}