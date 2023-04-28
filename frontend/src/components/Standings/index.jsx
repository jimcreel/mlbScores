import { useEffect, useState } from 'react';
import { getStandings } from '../../../utils/api';
export default function Standings() {
const [standingsAL, setStandingsAL] = useState([])
const [standingsNL, setStandingsNL] = useState([])

    useEffect (() => {
        getStandings(103)
        .then(apiResponse => {
            setStandingsAL(apiResponse.data)
        }).then (() => {
            getStandings(104)
            .then(apiResponse => {
                setStandingsNL(apiResponse.data)
            })
        }
        )
    }, [])

    function buildStandings (league) {
          let standingsElement = league.records.map((division, index) => {
                return (
                    <div key={index}>
                        <h2>{divisionNames[index]}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                    <th>Win %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {division.teamRecords.map((teamRecord) => {
                                    return (
                                        <tr key={teamRecord.team.id}>
                                            <td>{teamRecord.team.name}</td>
                                            <td>{teamRecord.wins}</td>
                                            <td>{teamRecord.losses}</td>
                                            <td>{teamRecord.winPercentage}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            }
    
            )
            return standingsElement
        }

    let standingsALElements = <p>Loading...</p>
    let standingsNLElements = <p>Loading...</p>

    let divisionNames = ['East', 'Central', 'West']
    
    if (standingsAL.records) {
        standingsALElements = buildStandings(standingsAL)
    }
    if (standingsNL.records) {
        standingsNLElements = buildStandings(standingsNL)
    }

    



    return (
        <div className="flex flex-row">
            
            <div>
            <h1> American League </h1>
            {standingsALElements}
            </div>
            <div>
            <h1> National League </h1>
            {standingsNLElements}
            </div>
        </div>
    )
}