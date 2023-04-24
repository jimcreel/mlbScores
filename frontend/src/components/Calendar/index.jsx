import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Calendar (props) {
    const {setCurrentDate} = props
    
    let dateArray = []
    let today = new Date()
    for (let i = -3; i < 4; i++) {
        let newDate = new Date()
        newDate.setDate(newDate.getDate() + i)
        dateArray.push(newDate)
    }
    function handleCalendarClick (date) {
        setCurrentDate(date)
    }
    function handleArrowClick (direction) {
        let newDate = new Date()
        if (direction === 'left') {
            newDate.setDate(newDate.getDate() - 7)
        } else {
            newDate.setDate(newDate.getDate() + 7)
        }
        setCurrentDate(newDate)
    }
    
  const calendarDiv = dateArray.map((date) => {
    const dateStr = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
    
    return (
      <div key={dateStr} className='m-2'>
        <Link
          to="/"
          onClick={() => handleCalendarClick(date)}
        >
          <div className="block rounded-t overflow-hidden bg-white text-center w-24">
            <div className="bg-red text-white bg-black py-1">{date.toLocaleString("default", { month: "short" })}</div>
            <div className="pt-1 border-l border-r">
              <span className="text-4xl font-bold">{date.getDate()}</span>
            </div>
            <div className="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between">
              <span className="text-xs font-bold">{date.toLocaleString("default", { weekday: "short" })}</span>
              <span className="text-xs font-bold">{date.getFullYear()}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  });
    




    return (
        <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
            <div onClick={() => handleArrowClick('left')}> left arrow </div> 
            {calendarDiv}
            <div onClick={() => handleArrowClick('right')}> right arrow </div>
        </div>
    )
}

