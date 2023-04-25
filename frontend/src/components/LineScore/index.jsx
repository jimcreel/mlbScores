export default function LineScore(props) {
    const { game } = props;

    let innings = game.liveData.linescore.innings.length
    let awayLineScore = ''
    let homeLineScore = ''
    

    let lineScoreHeader = <p> Loading... </p>;
    if (game.liveData) {
        lineScoreHeader = (
            <thead>
                <tr>
                    <th className='w-[175px]'> Team </th>
                    {game.liveData.linescore.innings.map((inning) => {
                        return (
                            <th className='w-[25px] text-center'> {inning.num} </th>
                        )
                    }
                    )}
                    <th> </th> 
                    <th className='w-[25px] text-center'> R </th>
                    <th className='w-[25px] text-center'> H </th>
                    <th className='w-[25px] text-center'> E </th>
                </tr>
            </thead>
        )
        awayLineScore = (
            <tr>
                <td> {game.gameData.teams.away.name} </td>
                {game.liveData.linescore.innings.map((inning) => {
                    return (
                        <td className='text-center'> {inning.away.runs} </td>
                    )
                }
                )}
                <th></th>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.away.runs} </td>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.away.hits} </td>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.away.errors} </td>
            </tr>
        )
        homeLineScore = (
            <tr>
                <td> {game.gameData.teams.home.name} </td>
                {game.liveData.linescore.innings.map((inning) => {
                    return (
                        <td className='text-center'> {inning.home.runs} </td>
                    )
                }
                )}
                <th></th>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.home.runs} </td>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.home.hits} </td>
                <td className='text-center font-bold'> {game.liveData.linescore.teams.home.errors} </td>
            </tr>
        )

    }                 
 return (
    <div >
        <table>
            {lineScoreHeader}
            {awayLineScore}
            {homeLineScore}
        </table> 
    </div>
 )

}