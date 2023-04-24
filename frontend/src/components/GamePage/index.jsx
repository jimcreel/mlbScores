export default function Game(props){
    
    const {game} = props;
    console.log(game)

    let homePlayers = []
    let awayPlayers = []

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home
        awayPlayers = game.liveData.boxscore.teams.away
    }

    let playerNames = []
    if(game.gameData){
        playerNames = game.gameData.players
    }
    
    let homeElement = <p> Loading... </p>;
    let awayElement = <p> Loading... </p>;
    let homePitcher = <p> Loading... </p>;
    let awayPitcher = <p> Loading... </p>;

    console.log((homePlayers))
    if(game.liveData){
        homeElement = Object.values(homePlayers.batters).map((player) => {
            let playerId = `ID${player}`
            let playerPositions = Object.values(homePlayers.players[playerId].allPositions).map((position) => [position.abbreviation])
            let playerPositionString = playerPositions.join('-')
            let playerNameDiv = homePlayers.players[playerId].gameStatus.isSubstitute ? 'flex flex-row justify-between pr-5 pl-3' : 'flex flex-row justify-between pr-5'
            return(
                

                        <tr>
                            
                            <td><div className = {playerNameDiv}>{game.gameData.players[playerId].boxscoreName} <span className='opacity-50'> {playerPositionString} </span></div></td>
                            <td> {homePlayers.players[playerId].stats.batting.atBats} </td>
                            <td> {homePlayers.players[playerId].stats.batting.runs} </td>
                            <td> {homePlayers.players[playerId].stats.batting.hits} </td>
                            <td> {homePlayers.players[playerId].stats.batting.rbi} </td>


                        </tr>
                        

                
            )
        })
        awayElement = Object.values(awayPlayers.batters).map((player) => {
            let playerId = `ID${player}`
            let playerPositions = Object.values(awayPlayers.players[playerId].allPositions).map((position) => [position.abbreviation])
            let playerPositionString = playerPositions.join('-')
            let playerNameDiv = awayPlayers.players[playerId].gameStatus.isSubstitute ? 'flex flex-row justify-between pr-5 pl-3' : 'flex flex-row justify-between pr-5'
            return(
                

                        <tr>
                            <td><div className = {playerNameDiv}><p>{game.gameData.players[playerId].boxscoreName}</p><p className='opacity-50'>{awayPlayers.players[playerId].position.abbreviation}</p></div></td>
                            <td> {awayPlayers.players[playerId].stats.batting.atBats} </td>
                            <td> {awayPlayers.players[playerId].stats.batting.runs} </td>
                            <td> {awayPlayers.players[playerId].stats.batting.hits} </td>
                            <td> {awayPlayers.players[playerId].stats.batting.rbi} </td>


                        </tr>
                        

                
            )
        })
    }   
    return(
        <div>
            <table className='table-fixed'>
                <thead> 
                    <tr>
                        <th className='w-[175px]'> Name </th>
                        <th className='w-[25px] text-center'> AB </th>
                        <th className='w-[25px] text-center'> R </th>
                        <th className='w-[25px] text-center'> H </th> 
                        <th className='w-[25px] text-center'> RBI </th> 
                    </tr>
                </thead>
                <tbody>
                    {homeElement}
                </tbody>
            </table>
            <table className='table-fixed'>
            <thead> 
                    <tr>
                        <th className='w-[175px]'> Name </th>
                        <th className='w-[25px] text-center'> AB </th>
                        <th className='w-[25px] text-center'> R </th>
                        <th className='w-[25px] text-center'> H </th> 
                        <th className='w-[25px] text-center'> RBI </th>  
                    </tr>
                </thead>
                <tbody>
                    {awayElement}
                </tbody>
            </table>
        </div>
        
    )

}