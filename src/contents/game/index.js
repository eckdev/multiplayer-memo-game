import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Circle } from "../../components/Circle/index.js";
import { useGameContext } from "../../contexts/GameProvider.js";

const Game = () => {
  const { board } = useGameContext();
  console.log(board)
  const [cards] = useState(board);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);

  const clickOnCard = (index) => {
    if (openCards.length === 1) {
      setMoves(moves + 1);
      setOpenCards((prev) => [...prev, index]);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInActive = (item) => {
    return clearedCards.includes(item);
  };

  const evaluate = useCallback(
    (openCards) => {
      const [first, second] = openCards;
      if (cards[first].item === cards[second].item) {
        setClearedCards((prev) => [...prev, cards[first].item]);
      }
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    },
    [cards]
  );

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      evaluate(openCards);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards, evaluate]);

  return (
    <div className="mw-600 mx-auto">
      <div className="flex flex-wrap justify-center">
        {cards?.map((card, index) => {
          return (
            <Circle
              key={index}
              index={index}
              isFlipped={checkIsFlipped(index)}
              isInActive={checkIsInActive(card.item)}
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
