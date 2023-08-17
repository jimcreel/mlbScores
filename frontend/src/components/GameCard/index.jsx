import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios' 
import {getGame} from '../../../utils/api'

export default function GameCard(props) {
    const game = props.game;
    const [tickerGame, setTickerGame] = useState({game});
    const [isHovering, setIsHovering] = useState(false);
    const [isPlayVisible, setIsPlayVisible] = useState(false);

    

   
    const setGame = props.setGame;
    
    
    const handleMouseEnter = () => {
        console.log(previousPlayIndex)
        console.log(previousPlayDescription)
        setIsHovering(true);
        setIsPlayVisible(true); 
      };
      
      const handleMouseLeave = () => {
        setIsHovering(false);
        setIsPlayVisible(false);
      };
      

    useEffect (() => {
        getGame(game.gamePk).then(apiResponse => {
            setTickerGame(apiResponse.data)
            })
            }, [])
  

    


    let cardElement = <p> Loading... </p>;

    if (game.status.abstractGameState == 'Final' ) {
        let winningPitcher = '';
        let losingPitcher = '';
        let savePitcher = '';
        let awayId = game.teams.away.team.id;
        let homeId = game.teams.home.team.id;
        let awayScore = game.teams.away.score;
        let homeScore = game.teams.home.score;
        
        if(tickerGame.liveData){
            tickerGame.liveData.decisions? winningPitcher = tickerGame.liveData.decisions.winner.fullName : ''
            tickerGame.liveData.decisions? losingPitcher = tickerGame.liveData.decisions.loser.fullName: ''
            
           
        }

        cardElement = (
                <div className="flex items-center justify-around bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-around ">
                    
            
                    <div className="flex items-center flex-col justify-center align-between">
                      
                      <div className="flex flex-row items-center justify-center mb-2 ">
                          <img src={`/assets/${awayId}.svg`} className="w-[40px] h-[40px] mr-2" />
                          <p className="text-3xl font-bold">{awayScore}</p>
                      </div>
                      <div className="flex flex-row items-center justify-center ">
                          <img src={`/assets/${homeId}.svg`} className="w-[40px] h-[40px] mr-2" />
                          <p className="text-3xl font-bold">{homeScore}</p>
                      </div>
                    </div>
                 <div className = 'flex flex-col h-[75px] -mt-4'>
                    <p className ="text-center text-xl font-bold "> FINAL </p>
                {winningPitcher &&
                    <p className="text-left text-xs ml-5">W - {winningPitcher}</p>
                }
                {losingPitcher &&
                    <p className="text-left text-xs ml-5">L - {losingPitcher}</p>
                }
                {savePitcher && 
                    <p className="text-left text-xs ml-5">S - {savePitcher}</p>
                }
                </div> 
            </div>
        </div>
        )
        
    } else if (game.status.abstractGameState == 'Live') {
       
        if (tickerGame.gameData) {
            let awayId = tickerGame.gameData.teams.away.id;
            let homeId = tickerGame.gameData.teams.home.id;
            let awayScore = tickerGame.liveData.linescore.teams.away.runs;
            let homeScore = tickerGame.liveData.linescore.teams.home.runs;
            let outs = tickerGame.liveData.linescore.outs;
            let runners = ''
            let inning = tickerGame.liveData.linescore.currentInning;
            let topOrBottom = tickerGame.liveData.linescore.inningState;
            if (!tickerGame.liveData.linescore.offense.first && !tickerGame.liveData.linescore.offense.second && !tickerGame.liveData.linescore.offense.third) {
                runners = 'empty'
            } 
             if (tickerGame.liveData.linescore.offense.first) {
                runners += '1'
             }
             if (tickerGame.liveData.linescore.offense.second) {
                    runners += '2'
             }
             if (tickerGame.liveData.linescore.offense.third) {
                        runners += '3'
                    }
            
                
            

            const resultDescription = tickerGame?.liveData?.plays?.currentPlay?.result?.description;
            cardElement = (
              <div className="flex items-center justify-around bg-gray-100 rounded-lg p-4" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="flex items-center justify-around ">
                  
          
                  <div className="flex items-center flex-col justify-center align-between">
                    <p className="text-l font-bold">{topOrBottom} {inning}</p>
                    <div className="flex flex-row items-center justify-center mb-2 ">
                        <img src={`/assets/${awayId}.svg`} className="w-[40px] h-[40px] mr-2" />
                        <p className="text-3xl font-bold">{awayScore}</p>
                    </div>
                    <div className="flex flex-row items-center justify-center ">
                        <img src={`/assets/${homeId}.svg`} className="w-[40px] h-[40px] mr-2" />
                        <p className="text-3xl font-bold">{homeScore}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-16 ml-5">
                    <img  src={`/assets/runners/${runners}.png`}/>
                    <img  src={`/assets/outs/${outs}.png`}/>
                  </div>
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
            <div className="flex flex-col justify-around items-center align-baseline">
                <div className='flex flex-row justify-center items-center'>
                    <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7 m-5" /> 
                    <p className='text-center text-lg'>@</p>
                    <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7 m-5"/> 
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <p className="text-center text-s">{awayRecord}</p>
                    <div className="w-12"></div>
                    <p className="text-center text-s">{homeRecord}</p>
                </div>
                <p className="text-center text-xs">{gameTimeString}</p>
                
            </div>
        )
    }
    const previousPlayIndex = tickerGame?.liveData?.plays?.allPlays?.length - 2;
    const previousPlayDescription =
      tickerGame?.liveData?.plays?.allPlays[previousPlayIndex]?.result?.description;
    const resultDescription =
      tickerGame?.liveData?.plays?.currentPlay?.result?.description
      
      

      return (
        <div
          className="relative w-48 m-4 flex-shrink-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={"/game/" + game.gamePk}>
            {cardElement}
            {isHovering && game.status.abstractGameState === 'Live' && (
              <div
                className={`absolute top-0 left-0 mt-4 ml-48 p-4 w-48 bg-white rounded-lg shadow-md z-10 ${
                  isPlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300`}
              >
                <p>{previousPlayDescription || resultDescription}</p>
              </div>
            )}
          </Link>
        </div>
      );
    }
    
    
    
   