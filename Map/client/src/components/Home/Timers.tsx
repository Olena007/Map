import React, { useEffect, useState } from "react";

export default function Timers(seconds: number){
  const [partyTime, setPartyTime] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondss, setSeconds] = useState(0);

  // console.log("time here " + timeW);
  // let arrW = timeW.split(":");
  // setHoursW(Number(arrW[0]));
  // setMinutesW(Number(arrW[1]));
  // setSecondsW(Number(arrW[2]));

  var t = new Date(); 
  t.setSeconds(t.getSeconds() + seconds);

  // const addHours = (date: Date, hours: number): Date => {
  //   const result = new Date(date);
  //   result.setHours(result.getHours() + hours);
  //   return result;
  // };

  // const addMinutes = (date: Date, minutess: number): Date => {
  //   const result = new Date(date);
  //   result.setMinutes(result.getMinutes() + minutess);
  //   return result;
  // };

  // const addSeconds = (date: Date, secondss: number): Date => {
  //   const result = new Date(date);
  //   result.setSeconds(result.getSeconds() + secondss);
  //   return result;
  // };

  useEffect(() => {
    //const targettest = new Date();

    // var ha = addHours(targettest, hoursw);
    // var i = addMinutes(ha, minutesw);
    // var target = addSeconds(i, secondsw);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = t.getTime() - now.getTime();

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      

      {partyTime ? (
        <>
          <h1>done</h1>
        </>
      ) : (
        <>
        
          <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <div>the waiting train time {hours}:{minutes}:{secondss}</div>
                {/* <span className="time">{minutesw}</span>
                <span className="divider">:</span>
                <span className="time">{secondsw}</span> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}