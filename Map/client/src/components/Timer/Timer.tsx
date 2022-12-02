import React, { useEffect, useState } from "react";

export default function Timer(){
    let counter: { min: number, sec: number }

  function startTimer() {
    counter = { min: 30, sec: 0 } // choose whatever you want
    let intervalId = setInterval(() => {
      if (counter.sec - 1 == -1) {
        counter.min -= 1;
        counter.sec = 59
      } 
      else counter.sec -= 1
      if (counter.min === 0 && counter.sec == 0) clearInterval(intervalId)
    }, 1000)
  }
    // const [arrivalTime, setArrivalTime] = useState(false);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);

    // useEffect(() => {
    //     const target = new Date();
    //     target.setHours(0, )
    
    //     const interval = setInterval(() => {
    //       const now = new Date();
    //       const difference = target.getTime() - now.getTime();
    
    //       const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    //       setMinutes(m);
    
    //       const s = Math.floor((difference % (1000 * 60)) / 1000);
    //       setSeconds(s);
    
    //       if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
    //         setArrivalTime(true);
    //       }
    //     }, 1000);
    
    //     return () => clearInterval(interval);
    //   }, []);
}