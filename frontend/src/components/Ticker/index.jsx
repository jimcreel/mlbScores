
import GameCard from "../GameCard";


export default function Ticker(props) {
    const schedule = props.schedule;
    const setGame = props.setGame;
    const setPlayer = props.setPlayer;
    const setGameOrPlayer = props.setGameOrPlayer;
    

    let scheduleElement = <p> Loading... </p>;

    if(schedule.dates) {
        scheduleElement = schedule.dates[0].games.map((gameCard) => <GameCard key={gameCard.gamePk} game={gameCard} setGame={setGame} setPlayer={setPlayer} setGameOrPlayer={setGameOrPlayer}/>)
    }



        

    return (
    <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
        
        {scheduleElement}
        
    </div>

    );
}
