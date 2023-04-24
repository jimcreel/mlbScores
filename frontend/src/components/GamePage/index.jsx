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

    function buildBoxscoreHitting (playerList) {
        let teamElement = Object.values(playerList.batters).map((player) => {
            let playerId = `ID${player}`
            let playerPositions = Object.values(playerList.players[playerId].allPositions).map((position) => [position.abbreviation])
            let playerPositionString = playerPositions.join('-')
            let playerNameDiv = playerList.players[playerId].gameStatus.isSubstitute ? 'flex flex-row justify-between pr-5 pl-3' : 'flex flex-row justify-between pr-5'
            
            return playerPositions.length ==1 && playerPositions[0] == 'P' ? (
                '') :
            (  
                <tr>
                    <td><div className = {playerNameDiv}>{game.gameData.players[playerId].boxscoreName} <span className='opacity-50'> {playerPositionString} </span></div></td>
                    <td> {playerList.players[playerId].stats.batting.atBats} </td>
                    <td> {playerList.players[playerId].stats.batting.runs} </td>
                    <td> {playerList.players[playerId].stats.batting.hits} </td>
                    <td> {playerList.players[playerId].stats.batting.rbi} </td>
                </tr>                
            )
        })
        return teamElement
    }




    console.log((homePlayers))
    if(game.liveData){
        homeElement = buildBoxscoreHitting(homePlayers)
        awayElement = buildBoxscoreHitting(awayPlayers)
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
            <table className='table-fixed'>
                {hittingTableHead}
                <tbody>
                    {homeElement}
                </tbody>
            </table>
            <table className='table-fixed'>
                {hittingTableHead}
                <tbody>
                    {awayElement}
                </tbody>
            </table>
        </div>
        
    )

}