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
            let playerID = `ID${player}`
            let playerGameStats = ''
            return(
                <div>
                    <p>{playerGameStats}</p>
                </div>
            )
        })
    }   
    return(
        <div>
            {homeElement}
        </div>
        
    )

}