import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Calendar ({ currentDate, setCurrentDate}) {
    console.log(currentDate)
    let dateArray = []
    for (let i = -4; i < 3; i++) {
        let newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + i)
        dateArray.push(newDate)
    }
    let calendarDiv = <p> Loading... </p>;
    if (currentDate != null) {
        calendarDiv = dateArray.map((date) => {
            return (
            <div>
                <p onClick= {(setCurrentDate(date))}> {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} </p>
            </div>)
        })
    }




    return (
        <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
            {calendarDiv}
        </div>
    )
    }

