import { pseudoRandomBytes } from "crypto";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../Home/Home.css';
import Header from "./Header";
// import { MapContainer } from 'react-leaflet/MapContainer';
// import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import Timer from "./Timers";
import { Marker, Popup, TileLayer } from "leaflet";
import { MapContainer } from "react-leaflet";

interface IWait{
    station: string;
}
interface ITime{
    time: string;
}

interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

interface ICountdownTravel {
  hoursTravel: number;
  minutesTravel: number;
  secondsTravel: number;
}





function Home(props : {name: string}) {
    const navigation = useNavigate();
    const [stationX, setStationX] = useState('');
    const [stationY, setStationY] = useState('');
    //const [wait, setWait] = useState();
    const [travel, setTravel] = useState();
    const [price, setPrice] = useState();
    const [lock, setLock] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [waait, setWaait] = useState();
    const [partyTime, setPartyTime] = useState(false);
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  const [hoursTravel, setHoursTravel] = useState<number>();
  const [minutesTravel, setMinutesTravel] = useState<number>();
  const [secondsTravel, setSecondsTravel] = useState<number>();
  //const [date, setdate] = useState(new Date());
const [name, setName] = useState('');
const [date, setDate] = useState(new Date());
const [waitb, setWaitb] = useState(false);
const [state, setState] = useState(false);

    var arr: Array<any> = [];

    const addSeconds = (date: Date, secondss: number): Date => {
    const result = new Date(date);
    result.setSeconds(result.getSeconds() + secondss);
    return result;
  };
  
  
  useEffect(() => {
    (
        async () => {
            const response = await fetch('http://localhost:7229/api/client', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            const content = await response.json();

            setName(content.email);
        }
    )();
});

let datenow = new Date();


    const submit = async(e : SyntheticEvent) => {
        e.preventDefault();

       async function postW(){
                fetch('http://localhost:7229/api/Initial/waiting', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({station: stationX})
            }).then(res => res.json())
            .then(res => {
                console.log("try wait " + res);
                setWaait(res);
                //date.setSeconds(res);
                setHours(Math.floor( res/ 3600));
                setMinutes(Math.floor(res % 3600 / 60));
                setSeconds(Math.floor(res % 3600 % 60));
            });

            setWaitb(true);
        }

        console.log("hours " + hours);
        console.log("minutes " + minutes);
        console.log("seconds " + seconds);

        postW();

        function postT(){
            fetch('http://localhost:7229/api/Initial/travel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstStation: stationX, secondStation: stationY})
        }).then(res => res.json())
        .then(res => {
            //console.log("try travel " + res);
            setTravel(res);
            setHoursTravel(Math.floor( res/ 3600));
                setMinutesTravel(Math.floor(res % 3600 / 60));
                setSecondsTravel(Math.floor(res % 3600 % 60));
        });
        }
        postT();
        // fetch('https://localhost:7229/api/Initial/travel', {
        // method: 'POST',
        // headers: {
        //     'Accept': 'application/json, text/plain, */*',
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({firstStation: stationX, secondStation: stationY})
        // }).then(res => res.json())
        // .then(res => {
        //     console.log(res);
        //     setTravel(res);
        // });

        fetch('http://localhost:7229/api/Initial/price', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstStation: stationX, secondStation: stationY})
        }).then(res => res.json())
        .then(res => {
            //console.log("try price " + price);
            setPrice(res);
        });

        setLock(true);
    }

    const CountDownTimer = ({ hours, minutes, seconds }: ICountdown) => {
    

      const [time, setTime] = React.useState<ICountdown>({hours, minutes, seconds});
      
    
      const tick = () => {     
        //console.log("time " + time.hours + ":" + time.minutes + ":" + time.seconds);
          if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) 
            //setState(true)
            
              reset()
          else if (time.minutes === 0 && time.seconds === 0 && time.hours != 0) {
            
              setTime({hours: time.hours - 1, minutes: 59, seconds: 59});
              //console.log("hours is " + time.hours);
          } else if (time.seconds === 0) {
              setTime({hours: time.hours, minutes: time.minutes - 1, seconds: 59});
              //console.log("minutes is " + time.minutes);
          } else {
              setTime({hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1});
              //console.log("seconds is " + time.seconds);
          }

          
      };
    
    
      const reset = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setState(true);
        setTime({hours: 0, minutes: 0, seconds: 0});
      }
    
      
      React.useEffect(() => {
          const timerId = setInterval(() => tick(), 1000);
          return () =>  clearInterval(timerId);
          
      });
    

      
      
      return (
          <div>
              <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
              .toString()
              .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p> 
          </div>
      );
    }

    const CountDownTimerTravel = ({ hoursTravel = 0, minutesTravel = 0, secondsTravel = 60 }: ICountdownTravel) => {
    

      const [time, setTime] = React.useState<ICountdownTravel>({hoursTravel, minutesTravel, secondsTravel});
      
    
      const tick = () => {
     
          if (time.hoursTravel === 0 && time.minutesTravel === 0 && time.secondsTravel === 0) 
              reset()
          else if (time.secondsTravel === 0 && time.hoursTravel != 0) {
              setTime({hoursTravel: time.hoursTravel - 1, minutesTravel: 59, secondsTravel: 59});
          } else if (time.secondsTravel === 0) {
              setTime({hoursTravel: time.hoursTravel, minutesTravel: time.minutesTravel - 1, secondsTravel: 59});
          } else {
              setTime({hoursTravel: time.hoursTravel, minutesTravel: time.minutesTravel, secondsTravel: time.secondsTravel - 1});
          }
      };
    
    
      const reset = () => setTime({hoursTravel: time.hoursTravel, minutesTravel: time.minutesTravel, secondsTravel: time.secondsTravel});
    
      
      
      React.useEffect(() => {
        
          const timerId = setInterval(() => tick(), 1000);
          return () => clearInterval(timerId);
        
          
      });
    
      
      return (
          <div>
              <p>{`${time.hoursTravel.toString().padStart(2, '0')}:${time.minutesTravel
              .toString()
              .padStart(2, '0')}:${time.secondsTravel.toString().padStart(2, '0')}`}</p> 
          </div>
      );
    }

    
    let timertime;
    let waittime;

    if (hours == 0 && minutes == 0 && seconds == 0 && hoursTravel != undefined && minutesTravel != undefined && secondsTravel != undefined){
          console.log("j " + hoursTravel);
      timertime = (
            <CountDownTimerTravel hoursTravel={hoursTravel} minutesTravel={minutesTravel} secondsTravel={secondsTravel} />
          );
    }

    if (hours != 0 && minutes != 0 && seconds != 0 && hours != undefined && minutes != undefined && seconds != undefined){
      //console.log("j " + hoursTravel);
  waittime = (
    <CountDownTimer hours={0} minutes={0} seconds={3}/>
      );
}
else{
  waittime = (
    <CountDownTimer hours={0} minutes={0} seconds={0}/>
  );
}
  
    let menu;
    if (lock === true && hours != undefined && minutes != undefined && seconds != undefined) {
        menu = (
            partyTime ? (
                <>
                  <h1>done</h1>
                </>
              ) : (
                <>
                
                  <div className="timer-wrapper">
                    <div className="timer-inner">
                      <div className="timer-segment">
                        {/* <div>the waiting train time {hours}:{minutes}:{secondss}</div> */}
                        {/* <div>the waiting train time {waittime}</div> */}
                        <div>the waiting train time {<CountDownTimer hours={0} minutes={0} seconds={3}/>}</div>
                        <div>the time of the train journey {timertime}</div>
                        <div>the ptrice of the journey {price}</div>
                      </div>
                    </div>
                  </div>
                </>
              )
        )
        
    } 
    
    if (lock === false) {
        menu = (
            <div></div>
        )
    }

    
    const position = [51.505, -0.09];
    
    

    return(
        <div>
            <Header name={name} setName={setName}></Header>
            <div className="map-input">
              <div className="form-map">
                    <form onSubmit={submit}>
                        <div className="firststation">
                            <h6 className="mb-3 fw-normal">From</h6>
                            <input type="text" className="form-control" placeholder="Departure station" required 
                            onChange={e => setStationX(e.target.value)}/>
                        </div>
                        
                        <div className="secondstation">
                            <h6 className="mb-3 fw-normal">To</h6>
                            <input type="text" className="form-control" placeholder="Arrival station" required 
                            onChange={e => setStationY(e.target.value)}/>
                        </div>
                        <Button className="btn-custom" variant="success" type="submit">Search</Button>
                    </form>
                    {menu}
              </div>
              <div className="map-google-main">
              {/* <MapWithADirectionsRenderer
                zoom={12}
                center={{
                  lat: 19.4978,
                  lng: -99.1269,
                }}
              /> */}
              
              </div>  
           </div>
        </div>  
    );
}

export default Home;

function useMapEvents(arg0: { click(): void; locationfound(e: any): void; }) {
  throw new Error("Function not implemented.");
}
