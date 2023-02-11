import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Circle } from "../../components/Circle/index.js";
import { useGameContext } from "../../contexts/GameProvider.js";
import client from "@urturn/client";
import { useErrorContext } from "../../contexts/ErrorProvider.js";
import { usePlayerContext } from "../../contexts/PlayerProvider.js";
import { PacmanLoader } from "react-spinners";

const Game = () => {
  const { board, playerIdToMove, openedCards, players } = useGameContext();
  const { player } = usePlayerContext();
  const { setError } = useErrorContext();
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [isLoading,setIsLoading] = useState(player.id !== playerIdToMove);
  const timeout = useRef(null);

  const clickOnCard = async (cardIndex) => {
    if (player.id !== playerIdToMove) {
      return false;
    }
    setError(null);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, cardIndex]);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([cardIndex]);
    }
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const evaluate = useCallback(async () => {
    const [first, second] = openCards;
    const move = {
      first: cards[first].item,
      second: cards[second].item,
    };
    const { error } = await client.makeMove(move);
    if (error) {
      setError(error);
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  }, [openCards]);

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      evaluate();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [openCards, evaluate]);

  useEffect(() => {
    if (board) {
      setCards(board);
    }

    let isLoading = false;
    if(player.id !== playerIdToMove){
      isLoading = true;
    }
    setIsLoading(isLoading);

  }, [board,player]);

  return (
    <>
      {isLoading && (
        <div className="backdrop">
          <div className="center-loader">
            <PacmanLoader color="#FFFF00" />
          </div>
        </div>
      )}
      <div className="mw-600 mx-auto">
        <div className="flex flex-wrap justify-center">
          {cards?.map((card, index) => {
            return (
              <Circle
                key={index}
                index={index}
                isFlipped={checkIsFlipped(index)}
                isInActive={card.opened}
                clickEvent={clickOnCard}
                item={card}
              />
            );
          })}
        </div>

        <div className="flex flex-row py-10 pl-1">
          {players.map((item, index) => {
            return (
                <div
                  key={index}
                  className={
                    "flex-1 mr-2 text-slate-900 p-6 rounded-lg " +
                    (item.id === playerIdToMove
                      ? "bg-orange-400"
                      : "bg-slate-200")
                  }
                >
                  <span className="text-2xl font-bold text-slate-500">
                    {item.username.toUpperCase()}
                  </span>
                  <span className="text-2xl font-bold text-slate-500 float-right">
                    {openedCards[item.id].length}
                  </span>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(Game);
