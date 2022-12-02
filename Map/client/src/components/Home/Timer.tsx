import React, { useEffect, useState } from "react";

export default function Timer(f: number, s: number){
  const [partyTime, setPartyTime] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const addMinutes = (date: Date, minutess: number): Date => {
      const result = new Date(date);
      result.setMinutes(result.getMinutes() + minutess);
      return result;
  };

  const addSeconds = (date: Date, secondss: number): Date => {
      const result = new Date(date);
      result.setSeconds(result.getSeconds() + secondss);
      return result;
  };

  useEffect(() => {
    const targettest = new Date();

    var i = addMinutes(targettest, f);
    var target = addSeconds(i, s);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
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
                <span className="time">{minutes}</span>
                <span className="divider">:</span>
                <span className="time">{seconds}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}