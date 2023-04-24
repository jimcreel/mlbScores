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
        homeElement = Object.values(homePlayers.battingOrder).map((player) => {
            let playerId = `ID${player}`
            let playerGameStats = ''
            return(
                

                        <tr>
                            <td> {game.gameData.players[playerId].boxscoreName} </td>
                            <td> {homePlayers.players[playerId].stats.batting.atBats} </td>
                            <td> {homePlayers.players[playerId].stats.batting.runs} </td>
                            <td> {homePlayers.players[playerId].stats.batting.hits} </td>
                            <td> {homePlayers.players[playerId].stats.batting.rbi} </td>


                        </tr>
                        

                
            )
        })
        awayElement = Object.values(awayPlayers.battingOrder).map((player) => {
            let playerId = `ID${player}`
            let playerGameStats = ''
            return(
                

                        <tr>
                            <td> {game.gameData.players[playerId].boxscoreName} </td>
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
            <table>
                <th> Name </th>
                <th> AB </th>
                <th> R </th>
                <th> H </th> 
                <th> RBI </th> 
                {homeElement}
            </table>
            <table>
                <th> Name </th>
                <th> AB </th>
                <th> R </th>
                <th> H </th> 
                <th> RBI </th> 
                {awayElement}
            </table>
        </div>
        
    )

}