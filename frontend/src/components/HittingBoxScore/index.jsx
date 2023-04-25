export default function HittingBoxScore(props) {
    const {playerList} = props;
    const {game} = props;

    let teamElement = <tr>
        <th>Loading...</th>
    </tr>
   

    function buildBoxscoreHitting (playerList) {
            teamElement = Object.values(playerList.batters).map((player) => {
            let playerId = `ID${player}`
            let playerPositions = Object.values(playerList.players[playerId].allPositions).map((position) => [position.abbreviation])
            let playerPositionString = playerPositions.join('-')
            let playerNameDiv = playerList.players[playerId].gameStatus.isSubstitute ? 'flex flex-row justify-between pr-5 pl-3' : 'flex flex-row justify-between pr-5'
            
            return playerPositions.length ==1 && playerPositions[0] == 'P' ? (
                '') :
            (  
                <tr key={playerId}>
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
    if (playerList) {
        buildBoxscoreHitting(playerList)
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

return ( 
    <table className='table-fixed'>
        {hittingTableHead}
        <tbody>
            {teamElement}
        </tbody>
    </table> 
)                   
}