import React, { useContext, useEffect, useState } from "react";
import GameCard from "../GameCard";
import { ScheduleContext } from "../Calendar";
import { DateContext } from "../Calendar";

export default function Ticker(props) {
  const schedule = useContext(ScheduleContext);
  const { currentDate } = useContext(DateContext);
  const { setGame } = props;

  const [scheduleElement, setScheduleElement] = useState(<>loading...</>);

  useEffect(() => {
    if (schedule.dates?.length > 0) {
      const games = schedule.dates[0].games.map((gameCard) => (
        <GameCard key={gameCard.gamePk} game={gameCard} setGame={setGame} />
      ));
      setScheduleElement(games);
    } else {
      setTimeout(() => {
        setScheduleElement(<>No games scheduled for today</>);
      }, 1000); // 4 seconds
    }
  }, [schedule, setGame]);

  return (
    <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30 mx-20 justify-center">
      {scheduleElement}
    </div>
  );
}
