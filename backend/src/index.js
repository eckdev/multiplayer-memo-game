const data = require("./mock.json");

const Status = Object.freeze({
    PreGame: 'preGame',
    InGame: 'inGame',
    EndGame: 'endGame'
});

const shuffleData = array => {
    let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function onRoomStart() {
    return {
        state: {
            status: Status.PreGame,
            winner: null,
            board: [],
            openedCards: [],
            playerSelectedValue: null
        }
    }
}

function onPlayerJoin(player,roomState) {
    const {players,state} = roomState;
    if (players.length === 2) {
        state.board = shuffleData(data.concat(data));
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

    if (state?.status !== Status.InGame) {
        throw new Error("game is not in progress")
    }

    console.log(move)
    
}

module.exports = {
    onRoomStart,
    onPlayerJoin,
    onPlayerMove
};
