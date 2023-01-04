import { useEffect } from "react";
import client, { events } from "@urturn/client";
import {Status} from '../../helpers/types.js'
import { useGameContext } from "../../contexts/GameProvider.js";
import { usePlayerContext } from "../../contexts/PlayerProvider.js";
import Game from "../game/index.js";

const GameBoard = () => {
  const { setGame, status, players } = useGameContext();
  const { player, setPlayer } = usePlayerContext();
  console.log(players)

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
  }, [setGame,setPlayer]);

  return (
    <>
      {
        (!players ||
        players?.length < 2 ||
        status === Status.PreGame) && 
          (<p className="bg-red-900">Waiting on other player...</p>)
        }
      
      {
        players?.length === 2 && <Game />
      }
    </>
  );
};

export default GameBoard;
