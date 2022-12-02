import React, { SyntheticEvent, useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import "./Admin.css";
import AdminBar from "./AdminBar";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { randomFillSync } from "crypto";
import { Link, Navigate } from "react-router-dom";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { styled, useTheme, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';



interface ITransport{
    transportId: number,
    type: string,
    transportNumber: number,
    citName: string
}

interface ITimetable{
    timetableId: number,
    stationId : number,
    beginning: string,
    ending: string,
    transportId: number
}

interface ILine{
    lineId: number,
    lineColor: string,
    periodId: number,
    intervalId: number
}

interface IStation{
    stationId: number,
    stationName: string,
    latitude: string,
    longitude: string
}

interface IInterval{
    intervalId: number,
    intervalNumber: number 
}

interface IPeriod{
    periodId: number,
    timeFrom: string,
    timeTo: string
}

interface IPrice{
    priceId: number,
    zoneName: string,
    cost: number
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Admin(){
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const [trans, setTrans] = useState(false); 
        const [transType, setType] = useState('');
        const [transNumber, setNumber] = useState('');
        const [city, setCity] = useState('');
    const [time, setTimetbl] = useState(false); 
        const [timeStation, setTimeStation] = useState('');
        const [timeBegin, setTimeBegin] = useState('');
        const [timeEnd, setTimeEnd] = useState('');
        const [timeTrans, setTimeTrans] = useState('');
    const [lines, setLines] = useState(false);
        const [linecolor, setLineColor] = useState('');
        const [lineperiod, setLinePeriod] = useState('');
        const [lineinterval, setLineInterval] = useState('');
    const [stations, setStations] = useState(false); 
        const [stationName, setStationName] = useState('');
        const [latitude, setLatitude] = useState('');
        const [longitude, setLongitude] = useState('');
    const [intervals, setIntervals] = useState(false);
        const [intervalNumber, setIntervalNumber] = useState(''); 
    const [periods, setPeriods] = useState(false); 
        const [timeFrom, setTimeFrom] = useState('');
        const [timeTo, setTimeTo] = useState('');
    const [price, setPrice] = useState(false); 
        const [pricezone, setPriceZone] = useState('');
        const [cost, setCost] = useState('');

    const [transport, setTransDisplay] = useState<ITransport[]>([]);
    const [timetable, setTimeDisplay] = useState<ITimetable[]>([]);
    const [linetable, setLineDisplay] = useState<ILine[]>([]);
    const [stationtable, setStationDisplay] = useState<IStation[]>([]);
    const [intervaltable, setIntervalDisplay] = useState<IInterval[]>([]);
    const [periodtable, setPeriodDisplay] = useState<IPeriod[]>([]);
    const [pricetable, setPriceDisplay] = useState<IPrice[]>([]);

    const [transportSearch, setTransDisplaySearch] = useState<ITransport[]>([]);
    const [timetableSearch, setTimeDisplaySearch] = useState<ITimetable[]>([]);
    const [linetableSearch, setLineDisplaySearch] = useState<ILine[]>([]);
    const [stationtableSearch, setStationDisplaySearch] = useState<IStation[]>([]);
    const [intervaltableSearch, setIntervalDisplaySearch] = useState<IInterval[]>([]);
    const [periodtableSearch, setPeriodDisplaySearch] = useState<IPeriod[]>([]);
    const [pricetableSearch, setPriceDisplaySearch] = useState<IPrice[]>([]);

    const[redirect, setRedirect] = useState(false);

    const [show, setShow] = useState(false);
    const [showu, setShowu] = useState(false);
    const [showtime, setShowtime] = useState(false);
    const [showtimeu, setShowtimeu] = useState(false);
    const [showline, setShowline] = useState(false);
    const [showlineu, setShowlineu] = useState(false);
    const [showst, setShowst] = useState(false);
    const [showstu, setShowstu] = useState(false);
    const [showinter, setShowinter] = useState(false);
    const [showinteru, setShowinteru] = useState(false);
    const [showper, setShowper] = useState(false);
    const [showperu, setShowperu] = useState(false);
    const [showprice, setShowprice] = useState(false);
    const [showpriceu, setShowpriceu] = useState(false);

    const [transSearch, setTransSearch] = useState('');
    const [transSearchb, setTransSearchb] = useState(false);
    const [timetblleSearch, setTimetableSearch] = useState('');
    const [timetableSearchb, setTimetableSearchb] = useState(false);
    const [lineSearch, setLineSearch] = useState('');
    const [lineSearchb, setLineSearchb] = useState(false);
    const [statSearch, setStationSearch] = useState('');
    const [statSearchb, setStationSearchb] = useState(false);
    const [intervalSearch, setIntervalSearch] = useState('');
    const [intervalSearchb, setIntervalSearchb] = useState(false);
    const [perSearch, setPeriodSearch] = useState('');
    const [perSearchb, setPeriodSearchb] = useState(false);
    const [pricSearch, setPriceSearch] = useState('');
    const [pricSearchb, setPriceSearchb] = useState(false);

    const [currentPage, setCurrent] = useState(1);
    const [itemsPerPage] = useState(3);

useEffect(() => {
  
function getTransport(){
    fetch('http://localhost:7229/Transport')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setTransDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getTransport();

function getTimetable(){
    fetch('http://localhost:7229/Timetable')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setTimeDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getTimetable();

function getLines(){
    fetch('http://localhost:7229/Line')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setLineDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getLines();

function getStations(){
    fetch('http://localhost:7229/Station')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setStationDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getStations();

function getInterval(){
    fetch('http://localhost:7229/api/Interval')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setIntervalDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getInterval();

function getPeriod(){
    fetch('http://localhost:7229/Period')
            .then(response => response.json())
            .then(added => {
                //console.log(added);
                setPeriodDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getPeriod();

function getPrice(){
    fetch('http://localhost:7229/Price')
            .then(response => response.json())
            .then(added => {
               // console.log(added);
                setPriceDisplay(added);
            })
            .catch((error) => {
                console.log(error);
            });
}
getPrice();


},[]);

var arr : Array<any> = [];

useEffect(() => {
  (
      async () => {
          const response = await fetch('http://localhost:7229/api/client', {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
          });

          const content = await response.json();

          setRole(content.clientRole);
      }
  )();
});

 function searchTransport(){
            fetch('http://localhost:7229/api/Initial/transport', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({element: transSearch})
        }).then(res => res.json())
        .then(res => {
            //console.log(res);
            setTransDisplaySearch(res);
            arr.push(res);
        });
      
        
        setTransSearchb(true);
        //console.log(transportSearch);
}

function searchTimetable(){
  fetch('http://localhost:7229/api/Initial/timetable', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: timetblleSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setTimeDisplaySearch(res);
  arr.push(res);
});


setTimetableSearchb(true);
//console.log(transportSearch);
}

function searchLine(){
  fetch('http://localhost:7229/api/Initial/line', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: lineSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setLineDisplaySearch(res);
  arr.push(res);
});


setLineSearchb(true);
//console.log(transportSearch);
}

function searchStation(){
  fetch('http://localhost:7229/api/Initial/station', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: statSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setStationDisplaySearch(res);
  arr.push(res);
});


setStationSearchb(true);
//console.log(transportSearch);
}

function searchInterval(){
  fetch('http://localhost:7229/api/Initial/interval', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: intervalSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setIntervalDisplaySearch(res);
  arr.push(res);
});


setIntervalSearchb(true);
//console.log(transportSearch);
}

function searchPeriod(){
  fetch('http://localhost:7229/api/Initial/period', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: perSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setPeriodDisplaySearch(res);
  arr.push(res);
});


setPeriodSearchb(true);
//console.log(transportSearch);
}

function searchPrice(){
  fetch('http://localhost:7229/api/Initial/searchPrice', {
method: 'POST',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
},
body: JSON.stringify({element: pricSearch})
}).then(res => res.json())
.then(res => {
  //console.log(res);
  setPriceDisplaySearch(res);
  arr.push(res);
});


setPriceSearchb(true);
//console.log(transportSearch);
}

const submit = () =>{
    async function postTransport(){
        try {
            const response = await fetch('http://localhost:7229/Transport', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({transportId: 0, type: transType, transportNumber: transNumber, cityName: city})
            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postTransport();
}
async function putTransport(id: number){
    try {
        const response = await fetch('http://localhost:7229/Transport', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            },
            body: JSON.stringify({transportId: id, type: transType, transportNumber: transNumber, cityName: city})
        });
    
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
        //alert("added");
        // return result;
        } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
        }
}
const deleteTrans = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Transport/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
const submitTimetable = () =>{
    async function postTimetable(){
        try {
            const response = await fetch('http://localhost:7229/Timetable', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                timetableId: 0,
                stationId : timeStation,
                beginning: timeBegin,
                ending: timeEnd,
                transportId: timeTrans
              })
            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postTimetable();
}
async function putTimetable(id: number){
    try {
        const response = await fetch('http://localhost:7229/Timetable', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({timetableId: id,
            stationId : timeStation,
            beginning: timeBegin,
            ending: timeEnd,
            transportId: timeTrans})
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
        //alert("added");
       // return result;
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
const deleteTimetable = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Timetable/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
const submitLine = () => {
    async function postLine(){
        try {
            const response = await fetch('http://localhost:7229/Line', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                lineId: 0,
                lineColor: linecolor,
                periodId: lineperiod,
                intervalId: lineinterval
              })            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postLine();
}
const deleteLine = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Line/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
async function putLine(id: number){
    try {
        const response = await fetch('http://localhost:7229/Line', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            lineId: id,
            lineColor: linecolor,
            periodId: lineperiod,
            intervalId: lineinterval
          })
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
const submitStation = () => {
    async function postLine(){
        try {
            const response = await fetch('http://localhost:7229/Station', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                stationId: 0,
                stationName: stationName,
                latitude: latitude,
                longitude: longitude
              })            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postLine();
}
const deleteStation = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Station/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
async function putStation(id: number){
    try {
        const response = await fetch('http://localhost:7229/Station', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            stationId: id,
            stationName: stationName,
            latitude: latitude,
            longitude: longitude
          })
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
const submitInterval = () => {
    async function postLine(){
        try {
            const response = await fetch('http://localhost:7229/api/Interval', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                intervalId: 0,
                intervalNumber: intervalNumber
              })            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postLine();
}
const deleteInterval = (id : number) =>{
    const responce = fetch ('http://localhost:7229/api/Interval/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
async function putInterval(id: number){
    try {
        const response = await fetch('http://localhost:7229/api/Interval', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            intervalId: id,
            intervalNumber: intervalNumber
          })
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
const submitPeriod = () => {
    async function postLine(){
        try {
            const response = await fetch('http://localhost:7229/Period', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                periodId: 0,
                timeFrom: timeFrom,
                timeTo: timeTo
              })            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postLine();
}
const deletePeriod = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Period/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
async function putPeriod(id: number){
    try {
        const response = await fetch('http://localhost:7229/Period', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            periodId: id,
            timeFrom: timeFrom,
            timeTo: timeTo
          })
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
const submitPrice = () => {
    async function postLine(){
        try {
            const response = await fetch('http://localhost:7229/Price', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                priceId: 0,
                zoneName: pricezone,
                cost: cost
              })            });
        
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = (await response.json()) as ITransport;
        
            console.log('result is: ', JSON.stringify(result, null, 4));
            //alert("added");
           // return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
    postLine();
}
const deletePrice = (id : number) =>{
    const responce = fetch ('http://localhost:7229/Period/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        setRedirect(true);
        window.location.reload();
}
async function putPrice(id: number){
    try {
        const response = await fetch('http://localhost:7229/Price', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            priceId: 0,
            zoneName: pricezone,
            cost: cost
          })
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = (await response.json()) as ITransport;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleCloseu = () => setShowu(false);
const handleShowu = () => setShowu(true);

const handleCloseTime = () => setShowtime(false);
const handleShowTime = () => setShowtime(true);
const handleCloseTimeu = () => setShowtimeu(false);
const handleShowTimeu = () => setShowtimeu(true);

const handleCloseLine = () => setShowline(false);
const handleShowLine = () => setShowline(true);
const handleCloseLineu = () => setShowlineu(false);
const handleShowLineu = () => setShowlineu(true);

const handleCloseSt = () => setShowst(false);
const handleShowSt = () => setShowst(true);
const handleCloseStu = () => setShowstu(false);
const handleShowStu = () => setShowstu(true);

const handleCloseInterval = () => setShowinter(false);
const handleShowInterval = () => setShowinter(true);
const handleCloseIntervalu = () => setShowinteru(false);
const handleShowIntervalu = () => setShowinteru(true);

const handleClosePeriod = () => setShowper(false);
const handleShowPeriod = () => setShowper(true);
const handleClosePeriodu = () => setShowperu(false);
const handleShowPeriodu = () => setShowperu(true);

const handleClosePrice = () => setShowprice(false);
const handleShowPrice = () => setShowprice(true);
const handleClosePriceu = () => setShowpriceu(false);
const handleShowPriceu = () => setShowpriceu(true);

const something=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchTransport();
  }
} 

const timetablefunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchTimetable();
  }
} 

const linefunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchLine();
  }
} 

const stationfunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchStation();
  }
} 

const periodfunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchPeriod();
  }
} 

const pricefunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchPrice();
  }
} 

const intervalfunc=(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
  if (e.key === "Enter") {
      //console.log('enter')
      searchInterval();
  }
} 

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentTransport = transport.slice(indexOfFirstItem, indexOfLastItem);
const currentTransportSearch = transportSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentTimetable = timetable.slice(indexOfFirstItem, indexOfLastItem);
const currentTimetableSearch = timetableSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentLine = linetable.slice(indexOfFirstItem, indexOfLastItem);
const currentLineSearch = linetableSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentStation = stationtable.slice(indexOfFirstItem, indexOfLastItem);
const currentStationSearch = stationtableSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentInterval = intervaltable.slice(indexOfFirstItem, indexOfLastItem);
const currentIntervalSearch = intervaltableSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentPeriod = periodtable.slice(indexOfFirstItem, indexOfLastItem);
const currentPeriodSearch = periodtableSearch.slice(indexOfFirstItem, indexOfLastItem);

const currentPrice = pricetable.slice(indexOfFirstItem, indexOfLastItem);
const currentPriceSearch = pricetableSearch.slice(indexOfFirstItem, indexOfLastItem);

const paginate = (pageNumber : number) => setCurrent(pageNumber);

function pag (pageNumber : number){
    setCurrent(pageNumber);
}

function Pagination (postPerPage : number, totalPost : number){
  const pageNumbers = [];


  for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
      pageNumbers.push(i);
  }

  return(
      <nav>
          <ul className="pagination">
              {pageNumbers.map(number => (
                  <li key={number} className="page-item">
                      <a onClick={() => pag(number)} className="page-link">{number}</a>
                  </li>
              ))}
          </ul>
      </nav>
  );
}

let menu;
let menuAll;

let searchmenuTrans;
let searchmenuInterval;
let searchmenuPeriod;
let searchmenuPrice;
let searchmenuLine;
let searchmenuStation;
let searchmenuTimetable;

console.log(transportSearch);

if(transSearchb == true){
  searchmenuTrans = (
    <>
    {currentTransportSearch.map((trans) => (

<tr>
    <td>{trans.type}</td>
    <td>{trans.transportNumber}</td>
    <td>{trans.citName}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTrans(trans.transportId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showu} onHide={handleCloseu}>
<Modal.Header closeButton>
  <Modal.Title>Change the transport</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Type</h6>
                <input type="text" className="form-control" placeholder="Transport Type" required 
                onChange={e => setType(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Number</h6>
                <input type="text" className="form-control" placeholder="Transport Number" required 
                onChange={e => setNumber(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">City</h6>
                <input type="text" className="form-control" placeholder="City Name" required 
                onChange={e => setCity(e.target.value)}/>
            </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTransport(trans.transportId)}>Modify Transport</Button>
            
</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, transportSearch.length)}
    </>
  )
}
if(transSearchb == false){
  searchmenuTrans = (
    <>
    {currentTransport.map((trans) => (

<tr>
    <td>{trans.type}</td>
    <td>{trans.transportNumber}</td>
    <td>{trans.citName}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTrans(trans.transportId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showu} onHide={handleCloseu}>
<Modal.Header closeButton>
  <Modal.Title>Change the transport</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Type</h6>
                <input type="text" className="form-control" placeholder="Transport Type" required 
                onChange={e => setType(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Number</h6>
                <input type="text" className="form-control" placeholder="Transport Number" required 
                onChange={e => setNumber(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">City</h6>
                <input type="text" className="form-control" placeholder="City Name" required 
                onChange={e => setCity(e.target.value)}/>
            </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTransport(trans.transportId)}>Modify Transport</Button>
            
</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, transport.length)}
    </>
  );
}

if(intervalSearchb == true){
  searchmenuInterval = (
    <>
    {currentIntervalSearch.map((el) => (

<tr>
    <td>{el.intervalNumber}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteInterval(el.intervalId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowIntervalu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showinteru} onHide={handleCloseIntervalu}>
<Modal.Header closeButton>
  <Modal.Title>Change the interval</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
    <div className="form-add">
        <h6 className="mb-3 fw-normal">Interval Number</h6>
        <input type="text" className="form-control" placeholder="Transport Type" required 
        onChange={e => setIntervalNumber(e.target.value)}/>
    </div>
    <Button className="btn-custom" variant="dark" type="submit" onClick={() => putInterval(el.intervalId)}>Modify Interval</Button>

</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, intervaltableSearch.length)}
    </>
  )
} 
if (intervalSearchb == false){
  searchmenuInterval = (
    <>
    {currentInterval.map((el) => (

<tr>
    <td>{el.intervalNumber}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteInterval(el.intervalId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowIntervalu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showinteru} onHide={handleCloseIntervalu}>
<Modal.Header closeButton>
  <Modal.Title>Change the interval</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
    <div className="form-add">
        <h6 className="mb-3 fw-normal">Interval Number</h6>
        <input type="text" className="form-control" placeholder="Transport Type" required 
        onChange={e => setIntervalNumber(e.target.value)}/>
    </div>
    <Button className="btn-custom" variant="dark" type="submit" onClick={() => putInterval(el.intervalId)}>Modify Interval</Button>

</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, intervaltable.length)}
    </>
  )
}

if(perSearchb == true){
  searchmenuPeriod = (
    <>
    {currentPeriodSearch.map((el) => (
      <tr>
          <td>{el.timeFrom}</td>
          <td>{el.timeTo}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deletePeriod(el.periodId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              <div className="btn-delete">
                  <MDBBtn color='dark' tag='a' floating onClick={handleShowPeriodu}>
                       <MDBIcon fas icon='magic' />
                  </MDBBtn>
                  <Modal show={showperu} onHide={handleClosePeriodu}>
      <Modal.Header closeButton>
        <Modal.Title>Change the period</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <div className="form-add">
                      <h6 className="mb-3 fw-normal">Time From</h6>
                      <input type="text" className="form-control" placeholder="Time From" required 
                      onChange={e => setTimeFrom(e.target.value)}/>
                  </div>
                  <div className="form-add">
                      <h6 className="mb-3 fw-normal">Time To</h6>
                      <input type="text" className="form-control" placeholder="Time To" required 
                      onChange={e => setTimeTo(e.target.value)}/>
      </div>
          <Button className="btn-custom" variant="dark" type="submit" onClick={() => putPeriod(el.periodId)}>Modify Interval</Button>

      </form>
      </Modal.Body>
    </Modal>
              </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, periodtableSearch.length)}
              </>
  )
}
if (perSearchb == false){
  searchmenuPeriod = (
    <>
    {currentPeriod.map((el) => (
      <tr>
          <td>{el.timeFrom}</td>
          <td>{el.timeTo}</td>
          <td>
              <div className="btn-all">
                  <div className="btn-delete">
                      <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deletePeriod(el.periodId)}>
                          <MDBIcon fas icon="trash" />
                      </MDBBtn>
                  </div>
              <div className="btn-delete">
                  <MDBBtn color='dark' tag='a' floating onClick={handleShowPeriodu}>
                       <MDBIcon fas icon='magic' />
                  </MDBBtn>
                  <Modal show={showperu} onHide={handleClosePeriodu}>
      <Modal.Header closeButton>
        <Modal.Title>Change the period</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <div className="form-add">
                      <h6 className="mb-3 fw-normal">Time From</h6>
                      <input type="text" className="form-control" placeholder="Time From" required 
                      onChange={e => setTimeFrom(e.target.value)}/>
                  </div>
                  <div className="form-add">
                      <h6 className="mb-3 fw-normal">Time To</h6>
                      <input type="text" className="form-control" placeholder="Time To" required 
                      onChange={e => setTimeTo(e.target.value)}/>
      </div>
          <Button className="btn-custom" variant="dark" type="submit" onClick={() => putPeriod(el.periodId)}>Modify Interval</Button>

      </form>
      </Modal.Body>
    </Modal>
              </div>
              </div>
          </td>
      </tr>
              ))}
              {Pagination(itemsPerPage, periodtable.length)}
              </>
  )
}

if(timetableSearchb == true){
  searchmenuTimetable = (
    <>
    {currentTimetableSearch.map((el) => (
                        <tr>
                            <td>{el.stationId}</td>
                            <td>{el.beginning}</td>
                            <td>{el.ending}</td>
                            <td>{el.transportId}</td>
                            <td>
                                <div className="btn-all">
                                    <div className="btn-delete">
                                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTimetable(el.timetableId)}>
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>
                                    </div>
                                    <div className="btn-delete">
                                        <MDBBtn color='dark' tag='a' floating onClick={handleShowTimeu}>
                                            <MDBIcon fas icon='magic' />
                                        </MDBBtn>
                                        <Modal show={showtimeu} onHide={handleCloseTimeu}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change the timetable</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Station Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeStation(e.target.value)}>
                                                        <option>Select station</option>
                                                        {stationtable.map((elem) => (
                                                        <option>{elem.stationId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Beginning</h6>
                                                    <input type="text" className="form-control" placeholder="Beginning" required 
                                                    onChange={e => setTimeBegin(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Ending</h6>
                                                    <input type="text" className="form-control" placeholder="Ending" required 
                                                    onChange={e => setTimeEnd(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Transport Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeTrans(e.target.value)}>
                                                        <option>Select transport</option>
                                                        {transport.map((tran) => (
                                                        <option>{tran.transportId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTimetable(el.timetableId)}>Modify Transport</Button>       
                                            </form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </td>
                        </tr>
                                ))}
                                {Pagination(itemsPerPage, timetableSearch.length)}
    </>
    )
}
if (timetableSearchb == false){
  searchmenuTimetable = (
    <>
    {currentTimetable.map((el) => (
                        <tr>
                            <td>{el.stationId}</td>
                            <td>{el.beginning}</td>
                            <td>{el.ending}</td>
                            <td>{el.transportId}</td>
                            <td>
                                <div className="btn-all">
                                    <div className="btn-delete">
                                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTimetable(el.timetableId)}>
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>
                                    </div>
                                    <div className="btn-delete">
                                        <MDBBtn color='dark' tag='a' floating onClick={handleShowTimeu}>
                                            <MDBIcon fas icon='magic' />
                                        </MDBBtn>
                                        <Modal show={showtimeu} onHide={handleCloseTimeu}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change the timetable</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Station Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeStation(e.target.value)}>
                                                        <option>Select station</option>
                                                        {stationtable.map((elem) => (
                                                        <option>{elem.stationId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Beginning</h6>
                                                    <input type="text" className="form-control" placeholder="Beginning" required 
                                                    onChange={e => setTimeBegin(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Ending</h6>
                                                    <input type="text" className="form-control" placeholder="Ending" required 
                                                    onChange={e => setTimeEnd(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Transport Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeTrans(e.target.value)}>
                                                        <option>Select transport</option>
                                                        {transport.map((tran) => (
                                                        <option>{tran.transportId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTimetable(el.timetableId)}>Modify Transport</Button>       
                                            </form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </td>
                        </tr>
                                ))}
                                {Pagination(itemsPerPage, timetable.length)}
    </>
    )
}

if(pricSearchb == true){
  searchmenuPrice = (
    <>
    {currentPriceSearch.map((el) => (
        <tr>
            <td>{el.zoneName}</td>
            <td>{el.cost}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deletePrice(el.priceId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowPriceu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showpriceu} onHide={handleClosePriceu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Zone Name</h6>
                        <input type="text" className="form-control" placeholder="Zone Name" required 
                        onChange={e => setPriceZone(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Cost</h6>
                        <input type="text" className="form-control" placeholder="Cost" required 
                        onChange={e => setCost(e.target.value)}/>
                    </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putPrice(el.priceId)}>Modify Price</Button>
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
            </td>
        </tr>
                ))}
                {Pagination(itemsPerPage, pricetableSearch.length)}
    </>
    )
}
if (pricSearchb == false){
  searchmenuPrice = (
    <>
    {currentPrice.map((el) => (
        <tr>
            <td>{el.zoneName}</td>
            <td>{el.cost}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deletePrice(el.priceId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowPriceu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showpriceu} onHide={handleClosePriceu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Zone Name</h6>
                        <input type="text" className="form-control" placeholder="Zone Name" required 
                        onChange={e => setPriceZone(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Cost</h6>
                        <input type="text" className="form-control" placeholder="Cost" required 
                        onChange={e => setCost(e.target.value)}/>
                    </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putPrice(el.priceId)}>Modify Price</Button>
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
            </td>
        </tr>
                ))}
                {Pagination(itemsPerPage, pricetable.length)}
    </>
    )
}

if(lineSearchb == true){
  searchmenuLine = (
    <>
    {currentLineSearch.map((el) => (

<tr>
    <td>{el.lineColor}</td>
    <td>{el.intervalId}</td>
    <td>{el.periodId}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteLine(el.lineId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowLineu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showlineu} onHide={handleCloseLineu}>
<Modal.Header closeButton>
  <Modal.Title>Change the line</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Line Color</h6>
                <input type="text" className="form-control" placeholder="Line Color" required 
                onChange={e => setLineColor(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Interval Id</h6>
                <select aria-label="Default select example"
                onChange={e => setLineInterval(e.target.value)}
                >
                    <option>Select interval</option>
                    {intervaltable.map((elem) => (
                    <option>{elem.intervalId}</option>
                ))}
                </select>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Period Id</h6>
                <select aria-label="Default select example"
                onChange={e => setLinePeriod(e.target.value)}
                >
                    <option>Select period</option>
                    {periodtable.map((elem) => (
                    <option>{elem.periodId}</option>
                ))}
                </select>
            </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putLine(el.lineId)}>Modify Line</Button>
            
</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, linetableSearch.length)}
    </>
    )
}
if (lineSearchb == false){
  searchmenuLine = (
    <>
    {currentLine.map((el) => (

<tr>
    <td>{el.lineColor}</td>
    <td>{el.intervalId}</td>
    <td>{el.periodId}</td>
    <td>
        <div className="btn-all">
            <div className="btn-delete">
                <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteLine(el.lineId)}>
                    <MDBIcon fas icon="trash" />
                </MDBBtn>
            </div>
        <div className="btn-delete">
            <MDBBtn color='dark' tag='a' floating onClick={handleShowLineu}>
                 <MDBIcon fas icon='magic' />
            </MDBBtn>
            <Modal show={showlineu} onHide={handleCloseLineu}>
<Modal.Header closeButton>
  <Modal.Title>Change the line</Modal.Title>
</Modal.Header>
<Modal.Body>
<form>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Line Color</h6>
                <input type="text" className="form-control" placeholder="Line Color" required 
                onChange={e => setLineColor(e.target.value)}/>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Interval Id</h6>
                <select aria-label="Default select example"
                onChange={e => setLineInterval(e.target.value)}
                >
                    <option>Select interval</option>
                    {intervaltable.map((elem) => (
                    <option>{elem.intervalId}</option>
                ))}
                </select>
            </div>
            <div className="form-add">
                <h6 className="mb-3 fw-normal">Period Id</h6>
                <select aria-label="Default select example"
                onChange={e => setLinePeriod(e.target.value)}
                >
                    <option>Select period</option>
                    {periodtable.map((elem) => (
                    <option>{elem.periodId}</option>
                ))}
                </select>
            </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putLine(el.lineId)}>Modify Line</Button>
            
</form>
</Modal.Body>
</Modal>
        </div>
        </div>
    </td>
</tr>
        ))}
        {Pagination(itemsPerPage, linetable.length)}
    </>
    )
}

if(statSearchb == true){
  searchmenuStation = (
    <>
    {currentStationSearch.map((el) => (
        <tr>
            <td>{el.stationName}</td>
            <td>{el.latitude}</td>
            <td>{el.longitude}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteStation(el.stationId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowStu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showstu} onHide={handleCloseStu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Station Name</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setStationName(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Latitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLatitude(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Longtitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLongitude(e.target.value)}/>
                    </div>   
                    <Button className="btn-custom" variant="dark" type="submit" onClick={() => putStation(el.stationId)}>Modify Station</Button>
                    
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
                
                
            </td>
        </tr>
                ))}
                {Pagination(itemsPerPage, stationtableSearch.length)}
    </>
    )
}
if (statSearchb == false){
  searchmenuStation = (
    <>
    {currentStation.map((el) => (
        <tr>
            <td>{el.stationName}</td>
            <td>{el.latitude}</td>
            <td>{el.longitude}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteStation(el.stationId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowStu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showstu} onHide={handleCloseStu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Station Name</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setStationName(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Latitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLatitude(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Longtitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLongitude(e.target.value)}/>
                    </div>   
                    <Button className="btn-custom" variant="dark" type="submit" onClick={() => putStation(el.stationId)}>Modify Station</Button>
                    
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
                
                
            </td>
        </tr>
                ))}
                {Pagination(itemsPerPage, stationtable.length)}
    </>
    )
}


if(trans == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setTransSearch(e.target.value)}
              onKeyDown={(e) => something(e) }
            />
          </Search>

            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShow}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
           
                <Modal className="down" show={show} onHide={handleClose}>
                              
                        <Modal.Header closeButton>

                          <Modal.Title>Add new transport</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={submit}>
                                    <div className="form-add">
                                        <h6 className="mb-3 fw-normal">Type</h6>
                                        <input type="text" className="form-control" placeholder="Transport Type" required 
                                        onChange={e => setType(e.target.value)}/>
                                    </div>
                                    <div className="form-add">
                                        <h6 className="mb-3 fw-normal">Number</h6>
                                        <input type="text" className="form-control" placeholder="Transport Number" required 
                                        onChange={e => setNumber(e.target.value)}/>
                                    </div>
                                    <div className="form-add">
                                        <h6 className="mb-3 fw-normal">City</h6>
                                        <input type="text" className="form-control" placeholder="City Name" required 
                                        onChange={e => setCity(e.target.value)}/>
                                    </div>
                                    <Button className="btn-custom" variant="dark" type="submit">Add Transport</Button>
                                    
                        </form>
                        </Modal.Body>
                      </Modal>
           
            
            <Table striped>
      <thead>
        <tr>
          <th>Type</th>
          <th>Transport Number</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuTrans}
      {/* {transport.map((trans) => (

        <tr>
            <td>{trans.type}</td>
            <td>{trans.transportNumber}</td>
            <td>{trans.citName}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTrans(trans.transportId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showu} onHide={handleCloseu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the transport</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Type</h6>
                        <input type="text" className="form-control" placeholder="Transport Type" required 
                        onChange={e => setType(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Number</h6>
                        <input type="text" className="form-control" placeholder="Transport Number" required 
                        onChange={e => setNumber(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">City</h6>
                        <input type="text" className="form-control" placeholder="City Name" required 
                        onChange={e => setCity(e.target.value)}/>
                    </div>
                    <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTransport(trans.transportId)}>Modify Transport</Button>
                    
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
            </td>
        </tr>
                ))} */}
      </tbody>
    </Table>
        </div>
        
    );
}
if(time == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setTimetableSearch(e.target.value)}
              onKeyDown={(e) => timetablefunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowTime}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showtime} onHide={handleCloseTime}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new timetable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitTimetable}>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Station Id</h6>
                            <select aria-label="Default select example"
                            onChange={e => setTimeStation(e.target.value)}
                            >
                                <option>Select station</option>
                                {stationtable.map((elem) => (
                                <option>{elem.stationId}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Beginning</h6>
                            <input type="text" className="form-control" placeholder="Beginning" required 
                            onChange={e => setTimeBegin(e.target.value)}/>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Ending</h6>
                            <input type="text" className="form-control" placeholder="Ending" required 
                            onChange={e => setTimeEnd(e.target.value)}/>
                        </div>
                        <div className="form-add">
                            <h6 className="mb-3 fw-normal">Transport Id</h6>
                            <select aria-label="Default select example"
                            onChange={e => setTimeTrans(e.target.value)}
                            >
                                <option>Select transport</option>
                                {transport.map((tran) => (
                                <option>{tran.transportId}</option>
                            ))}
                            </select>
                        </div>  
                        <Button className="btn-custom" variant="dark" type="submit">Add Transport</Button>      
                    </form>
                </Modal.Body>
            </Modal>

            <Table striped>
                <thead>
                    <tr>
                    <th>Station Id</th>
                    <th>Beginning</th>
                    <th>Ending</th>
                    <th>Transport Id</th>
                    </tr>
                </thead>
                <tbody>
                  {searchmenuTimetable}
                    {/* {timetable.map((el) => (
                        <tr>
                            <td>{el.stationId}</td>
                            <td>{el.beginning}</td>
                            <td>{el.ending}</td>
                            <td>{el.transportId}</td>
                            <td>
                                <div className="btn-all">
                                    <div className="btn-delete">
                                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteTimetable(el.timetableId)}>
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>
                                    </div>
                                    <div className="btn-delete">
                                        <MDBBtn color='dark' tag='a' floating onClick={handleShowTimeu}>
                                            <MDBIcon fas icon='magic' />
                                        </MDBBtn>
                                        <Modal show={showtimeu} onHide={handleCloseTimeu}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change the timetable</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Station Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeStation(e.target.value)}>
                                                        <option>Select station</option>
                                                        {stationtable.map((elem) => (
                                                        <option>{elem.stationId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Beginning</h6>
                                                    <input type="text" className="form-control" placeholder="Beginning" required 
                                                    onChange={e => setTimeBegin(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Ending</h6>
                                                    <input type="text" className="form-control" placeholder="Ending" required 
                                                    onChange={e => setTimeEnd(e.target.value)}/>
                                                </div>
                                                <div className="form-add">
                                                    <h6 className="mb-3 fw-normal">Transport Id</h6>
                                                    <select aria-label="Default select example"
                                                    onChange={e => setTimeTrans(e.target.value)}>
                                                        <option>Select transport</option>
                                                        {transport.map((tran) => (
                                                        <option>{tran.transportId}</option>
                                                    ))}
                                                    </select>
                                                </div>
                                                <Button className="btn-custom" variant="dark" type="submit" onClick={() => putTimetable(el.timetableId)}>Modify Transport</Button>       
                                            </form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </td>
                        </tr>
                                ))} */}
                </tbody>
            </Table>
        </div>
        
    );
}
if(lines == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setLineSearch(e.target.value)}
              onKeyDown={(e) => linefunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowLine}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showline} onHide={handleCloseLine}>
        <Modal.Header closeButton>
          <Modal.Title>Add new line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitLine}>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Line Color</h6>
                        <input type="text" className="form-control" placeholder="Transport Type" required 
                        onChange={e => setLineColor(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Interval Id</h6>
                        <select aria-label="Default select example"
                        onChange={e => setLineInterval(e.target.value)}
                        >
                            <option>Select interval</option>
                            {intervaltable.map((elem) => (
                            <option>{elem.intervalId}</option>
                        ))}
                        </select>
                        
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Period Id</h6>
                        <select aria-label="Default select example"
                        onChange={e => setLinePeriod(e.target.value)}
                        >
                            <option>Select period</option>
                            {periodtable.map((elem) => (
                            <option>{elem.periodId}</option>
                        ))}
                        </select>
                        
                    </div>
                    <Button className="btn-custom" variant="dark" type="submit">Add Line</Button>
                    
        </form>
        </Modal.Body>
      </Modal>
            <Table striped>
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th>Line Color</th>
          <th>Interval Id</th>
          <th>Period Id</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuLine}
      
      </tbody>
    </Table>
        </div>
        
    );
    // menu = (
    //     <div>
    //         <div className="btn-add">
    //             <Button variant="dark" onClick={handleShow}>+</Button>
    //         </div>

    //         <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Add new line</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //     <form onSubmit={submitLine}>
    //     <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Line Color</h6>
    //                     <input type="text" className="form-control" placeholder="Line Color" required 
    //                     onChange={e => setLineColor(e.target.value)}/>
    //                 </div>
    //                 <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Interval Id</h6>
    //                     <select aria-label="Default select example"
    //                     onChange={e => setLineInterval(e.target.value)}
    //                     >
    //                         <option>Select transport</option>
    //                         {intervaltable.map((elem) => (
    //                         <option>{elem.intervalId}</option>
    //                     ))}
    //                     </select>
    //                 </div>
    //                 <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Period Id</h6>
    //                     <select aria-label="Default select example"
    //                     onChange={e => setLineInterval(e.target.value)}
    //                     >
    //                         <option>Select transport</option>
    //                         {periodtable.map((elem) => (
    //                         <option>{elem.periodId}</option>
    //                     ))}
    //                     </select>
    //                 </div>       
    //     </form>
    //     </Modal.Body>
    //   </Modal>
    //         <Table striped>
    //   <thead>
    //     <tr>
    //       <th>Line Color</th>
    //       <th>Interval Id</th>
    //       <th>Period Id</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //   {linetable.map((el) => (
    //     <tr>
    //         <td>{el.lineColor}</td>
    //         <td>{el.intervalId}</td>
    //         <td>{el.periodId}</td>
    //         <td>
    //             <div className="btn-all">
    //                 <div className="btn-delete">
    //                     <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deleteLine(el.lineId)}>
    //                         <MDBIcon fas icon="trash" />
    //                     </MDBBtn>
    //                 </div>
    //             <div className="btn-delete">
    //                 <MDBBtn color='dark' tag='a' floating onClick={handleShow}>
    //                      <MDBIcon fas icon='magic' />
    //                 </MDBBtn>
    //                 <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Change the line</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //     <form>
    //                 <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Line Color</h6>
    //                     <input type="text" className="form-control" placeholder="Ending" required 
    //                     onChange={e => setLineColor(e.target.value)}/>
    //                 </div>
    //                 <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Interval Id</h6>
    //                     <select aria-label="Default select example"
    //                     onChange={e => setLineInterval(e.target.value)}>
    //                         <option>Select interval</option>
    //                         {intervaltable.map((el) => (
    //                         <option>{el.intervalId}</option>
    //                     ))}
    //                     </select>
    //                 </div>
    //                 <div className="form-add">
    //                     <h6 className="mb-3 fw-normal">Period Id</h6>
    //                     <select aria-label="Default select example"
    //                     onChange={e => setLinePeriod(e.target.value)}>
    //                         <option>Select period</option>
    //                         {periodtable.map((el) => (
    //                         <option>{el.periodId}</option>
    //                     ))}
    //                     </select>
    //                 </div>
    //                 <Button className="btn-custom" variant="dark" type="submit" onClick={() => putLine(el.lineId)}>Modify Transport</Button>
                    
    //     </form>
    //     </Modal.Body>
    //   </Modal>
    //             </div>
    //             </div>
                
                
    //         </td>
    //     </tr>
    //             ))}
    //   </tbody>
    // </Table>
    //     </div>
        
    // );
}
if(stations == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setStationSearch(e.target.value)}
              onKeyDown={(e) => stationfunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowSt}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showst} onHide={handleCloseSt}>
        <Modal.Header closeButton>
          <Modal.Title>Add new station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitStation}>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Station Name</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setStationName(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Latitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLatitude(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Longtitude</h6>
                        <input type="text" className="form-control" placeholder="Station Name" required 
                        onChange={e => setLongitude(e.target.value)}/>
                    </div>  
                    <Button className="btn-custom" variant="dark" type="submit">Add Stattion</Button>     
        </form>
        </Modal.Body>
      </Modal>
            <Table striped>
      <thead>
        <tr>
          <th>Station Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuStation}
      
      </tbody>
    </Table>
        </div>
        
    );
}
if(intervals == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setIntervalSearch(e.target.value)}
              onKeyDown={(e) => intervalfunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowInterval}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showinter} onHide={handleCloseInterval}>
        <Modal.Header closeButton>
          <Modal.Title>Add new interval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitInterval}>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Interval Number</h6>
                        <input type="text" className="form-control" placeholder="Transport Type" required 
                        onChange={e => setIntervalNumber(e.target.value)}/>
                    </div>
                    <Button className="btn-custom" variant="dark" type="submit">Add Interval</Button>     
        </form>
        </Modal.Body>
      </Modal>
            <Table striped>
      <thead>
        <tr>
          <th>Interval Number</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuInterval}
      
      </tbody>
    </Table>
        </div>
        
    );
}
if(periods == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setPeriodSearch(e.target.value)}
              onKeyDown={(e) => periodfunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowPeriod}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showper} onHide={handleClosePeriod}>
        <Modal.Header closeButton>
          <Modal.Title>Add new period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitPeriod}>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Time From</h6>
                        <input type="text" className="form-control" placeholder="Time From" required 
                        onChange={e => setTimeFrom(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Time To</h6>
                        <input type="text" className="form-control" placeholder="Time To" required 
                        onChange={e => setTimeTo(e.target.value)}/>
                    </div>
                    <Button className="btn-custom" variant="dark" type="submit">Add Period</Button>     
        </form>
        </Modal.Body>
      </Modal>
            <Table striped>
      <thead>
        <tr>
          <th>Time From</th>
          <th>Time To</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuPeriod}
      
      </tbody>
    </Table>
        </div>
        
    );
}
if(price == true){
    menu = (
        <div>
          <Search className="search-all">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setPriceSearch(e.target.value)}
              onKeyDown={(e) => pricefunc(e) }
            />
          </Search>
            <div className="btn-add">
                <MDBBtn color='dark' tag='a' floating onClick={handleShowPrice}>
                    <MDBIcon fas icon="plus" />
                </MDBBtn>            
            </div>
            <Modal className="down" show={showprice} onHide={handleClosePrice}>
        <Modal.Header closeButton>
          <Modal.Title>Add new price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitPrice}>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Zone Name</h6>
                        <input type="text" className="form-control" placeholder="Zone Name" required 
                        onChange={e => setPriceZone(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Cost</h6>
                        <input type="text" className="form-control" placeholder="Cost" required 
                        onChange={e => setCost(e.target.value)}/>
                    </div>
                    <Button className="btn-custom" variant="dark" type="submit">Add Price</Button>     
        </form>
        </Modal.Body>
      </Modal>
            <Table striped className="table">
      <thead>
        <tr>
          <th>Zone Name</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {searchmenuPrice}
      {/* {pricetable.map((el) => (
        <tr>
            <td>{el.zoneName}</td>
            <td>{el.cost}</td>
            <td>
                <div className="btn-all">
                    <div className="btn-delete">
                        <MDBBtn className="btn-delete" color='danger' tag='a' floating onClick={() => deletePrice(el.priceId)}>
                            <MDBIcon fas icon="trash" />
                        </MDBBtn>
                    </div>
                <div className="btn-delete">
                    <MDBBtn color='dark' tag='a' floating onClick={handleShowPriceu}>
                         <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <Modal show={showpriceu} onHide={handleClosePriceu}>
        <Modal.Header closeButton>
          <Modal.Title>Change the price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-add">
                        <h6 className="mb-3 fw-normal">Zone Name</h6>
                        <input type="text" className="form-control" placeholder="Zone Name" required 
                        onChange={e => setPriceZone(e.target.value)}/>
                    </div>
                    <div className="form-add">
                        <h6 className="mb-3 fw-normal">Cost</h6>
                        <input type="text" className="form-control" placeholder="Cost" required 
                        onChange={e => setCost(e.target.value)}/>
                    </div>
            <Button className="btn-custom" variant="dark" type="submit" onClick={() => putPrice(el.priceId)}>Modify Price</Button>
        </form>
        </Modal.Body>
      </Modal>
                </div>
                </div>
            </td>
        </tr>
                ))} */}
      </tbody>
    </Table>
        </div>
        
    );
}
if(trans == false && time == false && lines == false && stations == false && intervals == false && periods == false && price == false){
  menu = (
    <div className="text-admin">
      Welcome to the admin page!
    </div>
  )
}
if(role != "Admin"){
  menuAll = (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
else
{
  menuAll = (
    <div>
            {/* <AdminHeader name={name} setName={setName}></AdminHeader> */}
            <div className="main">
                <div className="bar-part">
                    <AdminBar menu={menu} name={name} setName={setName} setTrans={setTrans} setTimetbl={setTimetbl} setLines={setLines} setStations={setStations} setIntervals={setIntervals} setPeriods={setPeriods} setPrice={setPrice}></AdminBar>
                </div>
                {/* <div className="main-part">{menu}</div> */}
            </div>
        </div>
  )
}
    return(
      // <>
      // {menuAll}
      // </>
        <div>
          {menuAll}
            {/* <AdminHeader name={name} setName={setName}></AdminHeader> */}
            {/* <div className="main">
                <div className="bar-part">
                    <AdminBar menu={menu} name={name} setName={setName} setTrans={setTrans} setTimetbl={setTimetbl} setLines={setLines} setStations={setStations} setIntervals={setIntervals} setPeriods={setPeriods} setPrice={setPrice}></AdminBar>
                </div>
            </div> */}
        </div>
    );
}