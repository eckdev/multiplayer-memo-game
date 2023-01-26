import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Circle } from "../../components/Circle/index.js";
import { useGameContext } from "../../contexts/GameProvider.js";
import client from '@urturn/client';

const Game = () => {
  const { board } = useGameContext();
  const [cards,setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);

  const clickOnCard = async (cardIndex) => {
    if (openCards.length === 1) {
      setMoves(moves + 1);
      setOpenCards((prev) => [...prev, cardIndex]);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([cardIndex]);
    }
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };


  const evaluate = useCallback(
    async () => {
      const [first, second] = openCards;
      if (cards[first].item === cards[second].item) {
        await client.makeMove(cards[first]);
      }

      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);

    },
    [openCards]
  );

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
      setCards(board)
    }
  }, [board])
  

  return (
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

      <div className="details-container py-10 pl-1">
        <div className="bg-slate-200 text-slate-900 p-6 rounded-lg">
          <span className="text-2xl font-bold text-slate-500">Moves</span>
          <span className="text-2xl font-bold text-slate-500 float-right">
            {moves}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Game);
