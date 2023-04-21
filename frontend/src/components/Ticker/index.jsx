
import GameCard from "../GameCard";


export default function Ticker(props) {
    const schedule = props.schedule;
    const setGame = props.setGame;
    

    let scheduleElement = <p> Loading... </p>;

    if(schedule.dates) {
        scheduleElement = schedule.dates[0].games.map((gameCard) => <GameCard key={gameCard.gamePk} game={gameCard} setGame={setGame} />)
    }



        

    return (
    <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
        <div className="flex flex-row flex-wrap nowrap">
        {scheduleElement}
        </div>
    </div>

    );
}
