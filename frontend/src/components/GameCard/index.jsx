import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function GameCard(props) {
    const [tickerGame, setTickerGame] = useState({});
    const game = props.game;
    const setGame = props.setGame;
    

    useEffect(() => {
        getGameUpdate()
    }, [])

    function handleGameClick() {
        setGame(game);
    }

    async function getGameUpdate() {
        if (game.status.statusCode == 'I') {
            const response = await axios.get(`https://statsapi.mlb.com/api/v1.1/game/${game.gamePk}/feed/live`)
            setTickerGame(response.data)
            console.log(tickerGame.gameData.teams.away.id)
        }
    }

    let cardElement = <p> Loading... </p>;

    if (game.status.abstractGameState == 'Final') {
        cardElement = (
            <div className="flex flex-row  justify-around items-center align-baseline">
                <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
                <p className="text-center text-xl">{game.teams.away.score}</p>
                <p> F </p>
                <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
                <p className="text-center text-xl">{game.teams.home.score}</p>
            </div>
        )
    } else if (game.status.statusCode == 'In Progress') {
       
        if (tickerGame.gameData) {
            let awayId = tickerGame.gameData.teams.away.id;
            let homeId = tickerGame.gameData.teams.home.id;
            let awayScore = tickerGame.liveData.linescore.teams.away.runs;
            let homeScore = tickerGame.liveData.linescore.teams.home.runs;
            let outs = tickerGame.liveData.linescore.outs;
            let runners = ''
            if (!tickerGame.liveData.linescore.offense.first && !tickerGame.liveData.linescore.offense.second && !tickerGame.liveData.linescore.offense.third) {
                runners = 'empty'
            } else if (tickerGame.liveData.linescore.offense.first) {
                runners += '1'
                if (tickerGame.liveData.linescore.offense.second) {
                    runners += '2'
                    if (tickerGame.liveData.linescore.offense.third) {
                        runners += '3'
                    }
                }
            }

            console.log('here is the runners string', + runners)
            cardElement = (
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between w-2/3">
                  <div className="flex flex-col items-center justify-center mr-8">
                    <p className="font-bold text-lg">Inning</p>
                    <p>R H E</p>
                  </div>
          
                  <div className="flex items-center justify-center">
                    <img src={`/assets/${awayId}.svg`} className="w-7 mr-2" />
                    <p className="text-xl font-bold">{awayScore}</p>
                  </div>
          
                  <div className="flex items-center justify-center ml-8">
                    <img src={`/assets/${homeId}.svg`} className="w-7 mr-2" />
                    <p className="text-xl font-bold">{homeScore}</p>
                  </div>
                  <img src={`/assets/runners/${runners}.png`}/>
                  <img src={`/assets/outs/${outs}.png`}/>
                </div>
              </div>
            );
          }
          
    } else {   
            let gameTime = new Date(game.gameDate);
            let gameTimeString = gameTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            let awayRecord = game.teams.away.leagueRecord.wins + "-" + game.teams.away.leagueRecord.losses ;
            let homeRecord = game.teams.home.leagueRecord.wins + "-" + game.teams.home.leagueRecord.losses ;
            cardElement = (
                <div className="flex flex-row  justify-around items-center align-baseline">
                    <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" /> 
                    <p> @ </p>
                    <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/> 
                    <br />
                    <p className="text-center text-xs">{awayRecord}</p><p className="text-center text-xs">{gameTimeString}</p><p className="text-center text-xs">{homeRecord}</p>

                </div>
            )
        } 
    
            
        
    return (
        <div className="w-48 mr-4 flex-shrink-0">
            <Link to="/game" onClick={() => handleGameClick()}>
                {cardElement}
            </Link>
        </div>

    )

}

    // if (schedule.dates) {
    // console.log(schedule.dates[0].games);
    
    // scheduleElement = schedule.dates[0].games.map((game) => {
    //     let awayTeamScore = null;
    //     let homeTeamScore = null;
    //     let gamePk = game.gamePk
    //     if (game.teams.away.team.id) {
    //         awayTeamScore = (
    //         <div className="flex flex-row items-center align-baseline">
    //             <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
    //             <p className="text-center text-base">{game.teams.away.score}</p>
    //         </div>
    //         );
    //     }
        
    //     if (game.teams.home.team.id) {
    //         homeTeamScore = (
    //         <div className="flex flex-row items-center align-baseline">
    //             <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
    //             <p className="text-center text-xl">{game.teams.home.score}</p>
    //         </div>
    //         );
    //     }
        
    //     return (
    //         <div className="w-48 mr-4 flex-shrink-0">
    //         <Link to="/game" onClick={() => handleGameClick()}>
    //             <div className="flex flex-row  justify-around items-center align-baseline">
    //             <p className="text-xl">{awayTeamScore}  @ {homeTeamScore} </p>
    //             </div>
    //         </Link>
    //         </div>
    //     );
    //     });
    // }