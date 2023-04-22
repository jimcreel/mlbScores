export default function Game(props){
    
    const {game} = props;
    console.log(game)

    let homePlayers = []
    let awayPlayers = []

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home.players
        awayPlayers = game.liveData.boxscore.teams.away.players
    }

    let playerNames = []
    if(game.gameData){
        playerNames = game.gameData.players
    }
    console.log(homePlayers)
    console.log(awayPlayers)
    console.log(playerNames)
    let homeElement = <p> Loading... </p>;
    let awayElement = <p> Loading... </p>;
    let homePitcher = <p> Loading... </p>;
    let awayPitcher = <p> Loading... </p>;

    if(game.liveData){
        homeElement = Object.values(homePlayers).map((player) => {
            if(player.position.code == 'P'){
                homePitcher = playerNames[player.person.id].fullName
            }
            // return(
            //     <div className="flex flex-row justify-around items-center align-center">
            //         <p className="text-center text-xs">{playerNames[player.person.id].fullName}</p>
            //     </div>
            // )
        })
    }   
    return(
        <div>
            {homeElement}
        </div>
        
    )

}