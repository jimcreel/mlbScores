
import GameCard from "../GameCard";
import {useContext, useEffect} from "react";
import {ScheduleContext} from "../Calendar";
import {DateContext} from "../Calendar";


export default function Ticker(props) {
    const schedule = useContext(ScheduleContext);
    const {currentDate} = useContext(DateContext)
    const {setGame} = props

    useEffect(() => {
        console.log('useEffect')

    }, [schedule])
    
    let scheduleElement = <div> loading...</div>
   
    if(schedule.dates) {
        scheduleElement = schedule.dates[0].games.map((gameCard) => <GameCard key={gameCard.gamePk} game={gameCard} setGame={setGame}/>)
    }
    



        

    return (
    <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
        
        {scheduleElement}
        
    </div>

    );
}
