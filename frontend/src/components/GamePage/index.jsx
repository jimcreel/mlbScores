import {Link} from 'react-router-dom'
import LineScore from '../LineScore';
import HittingBoxScore from '../HittingBoxScore';
import PitchingBoxScore from '../PitchingBoxScore';

export default function GamePage(props){
    const {setGameOrPlayer} = props;
    const {setCurrentPlayer} = props;
    const {game} = props;
    

    let homePlayers = []
    let awayPlayers = []

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home
        awayPlayers = game.liveData.boxscore.teams.away
    }

    
    
    
    

    





    
    const hittingTableHead =  <thead> 
                                    <tr>
                                        <th className='w-[175px]'> Name </th>
                                        <th className='w-[25px] text-center'> AB </th>
                                        <th className='w-[25px] text-center'> R </th>
                                        <th className='w-[25px] text-center'> H </th> 
                                        <th className='w-[25px] text-center'> RBI </th> 
                                    </tr>
                                </thead>

    return(
        <div className='flex flex-col'>
            <div className = 'flex flex-row justify-center'><LineScore game={game} /></div>
            <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                <div className='m-5'><HittingBoxScore playerList={awayPlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/><PitchingBoxScore playerList={awayPlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer} /></div>
                <div className='m-5'><HittingBoxScore playerList={homePlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/>
                <PitchingBoxScore playerList={homePlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/></div>
                
            </div>
        </div>
        
    )

}