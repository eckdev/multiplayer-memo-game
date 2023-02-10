import { useEffect, useRef } from "react";
import client, { events } from "@urturn/client";
import { Status } from "../../helpers/types.js";
import { useGameContext } from "../../contexts/GameProvider.js";
import { usePlayerContext } from "../../contexts/PlayerProvider.js";
import Game from "../game/index.js";
import ReactConfetti from "react-confetti";
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";

const GameBoard = () => {
  const { setGame, status, players, winner } = useGameContext();
  const { player, setPlayer } = usePlayerContext();

  useEffect(() => {
    const onStateChanged = (newGameState) => {
      setGame(newGameState);
    };
    const getLocalPlayer = async () => {
      setPlayer(await client.getLocalPlayer());
    };

    getLocalPlayer();
    events.on("stateChanged", onStateChanged);
    return () => {
      events.off("stateChanged", onStateChanged);
    };
  }, [setGame, setPlayer]);

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <>
      {(!players || players?.length < 2 || status === Status.PreGame) && (
        <Modal open={true} center showCloseIcon={false}>
          <p className="text-2xl font-bold text-slate-500">Waiting for other players...</p>
        </Modal>
      )}

      {status === Status.EndGame && winner && (
        <>
          <Modal open={true} center>
            <p className="text-2xl font-bold text-slate-500 py-20">{winner !== "Draw" ? `WINNER ${player.id}` : "DRAW"}</p>
          </Modal>
          <ReactConfetti
            width={windowSize.current[0]}
            height={windowSize.current[1]}
          />
        </>
      )}
      {players?.length === 2 && <Game />}
    </>
  );
};

export default GameBoard;
