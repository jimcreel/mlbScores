import {Link} from 'react-router-dom'
import LineScore from '../LineScore';
import HittingBoxScore from '../HittingBoxScore';

export default function Game(props){
    
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
        <div>
            <LineScore game={game} />
            <HittingBoxScore playerList={homePlayers} game={game} />
            <HittingBoxScore playerList={awayPlayers} game={game} />
            
        </div>
        
    )

}