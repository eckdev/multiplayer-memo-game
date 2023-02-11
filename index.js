"use strict";

const Status = Object.freeze({
  PreGame: "preGame",
  InGame: "inGame",
  EndGame: "endGame",
});

const shuffleData = (array) => {
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
};

function onRoomStart() {
  return {
    state: {
      status: Status.PreGame,
      winner: null,
      board: [],
      openedCards: {},
      playerIdToMove: null,
    },
  };
}

function onPlayerJoin(player, roomState) {
  const { players, state } = roomState;
  state.openedCards[player.id] = [];
  if (players.length === 2) {
    const randomArr = [];
    while (randomArr.length < 8) {
      let random = Math.floor(Math.random() * 50 + 1);
      if (!randomArr.find((x) => x.item === random)) {
        randomArr.push(
          ...[
            {
              item: random,
              opened: false,
            },
          ]
        );
      }
    }
    state.board = shuffleData(randomArr.concat(randomArr));
    state.status = Status.InGame;
    state.playerIdToMove = players[0].id;
    return {
      state,
      joinable: false,
    };
  }
  return {
    state,
    joinable: true,
  };
}

function onPlayerMove(player, move, roomState) {
  const { players, state } = roomState;
  const otherPlrID = getOtherPlayer(players, player.id).id;

  if (state?.status !== Status.InGame) {
    throw new Error("game is not in progress");
  }

  if (state.playerIdToMove !== player.id) {
    throw new Error("It's not your turn! Waiting on other player.");
  }

  if (move.first === move.second) {
    const cards = state.board.map((x) =>
      x.item === move.first ? { ...x, opened: true } : x
    );
    state.board = cards;
    state.openedCards[player.id].push(move.first);
    state.playerIdToMove = player.id;
  } else {
    state.playerIdToMove = otherPlrID;
  }

  if (isEndGame(state)) {
    state.status = Status.EndGame;
    setWinner(state, player.id, otherPlrID);
    return {
      state,
      finished: true,
    };
  }

  return { state };
}

const setWinner = (state, playerId, otherPlayerId) => {
  if (
    state.openedCards[playerId].length > state.openedCards[otherPlayerId].length
  ) {
    state.winner = playerId;
  }

  if (
    state.openedCards[playerId].length < state.openedCards[otherPlayerId].length
  ) {
    state.winner = otherPlayerId;
  }

  if (
    state.openedCards[playerId].length ===
    state.openedCards[otherPlayerId].length
  ) {
    state.winner = "Draw";
  }
};

const isEndGame = (state) => {
  return state.board.every((item) => item.opened);
};
const getOtherPlayer = (players, currentPlayerID) =>
  players.find((plr) => plr.id !== currentPlayerID);

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
};
