import { useEffect, useState } from 'react';
import { Subject, interval, NEVER, switchMap, scan, tap, startWith } from "rxjs";
import './App.scss';
import Timer from './Components/Timer';

const sub = new Subject();

function App() {
  const [time, setTime] = useState({h: '00', m: "00", s: '00'}) 
  
  const secondsIntoTime = (seconds)=>{
    let _hours = Math.trunc(seconds / 3600);
    let _minutes = Math.trunc(seconds / 60) - _hours * 60;
    let _seconds = seconds - _hours * 3600 - _minutes * 60;

    return {h : addZeroBeforeNum(_hours), m : addZeroBeforeNum(_minutes), s : addZeroBeforeNum(_seconds)}
  }

  const addZeroBeforeNum = function(number) {
    let numInString = number.toString();
    return numInString.length === 1 ? `0${numInString}` : numInString;
  }

  useEffect(() => {
    sub.pipe(
      startWith({isPaused:true, value:0}),
      scan((acc, curr) => Object.assign(acc,curr)),
      tap((val)=>{setTime(secondsIntoTime(val.value));}),
      switchMap((state) =>  state.isPaused ? NEVER : interval(1000).pipe(
        tap(() => {
          state.value ++;
          setTime(secondsIntoTime(state.value));
        })
      )
    )).subscribe() 

  }, []);

  
  const onStartClick = () =>{
    sub.next({isPaused: false})
  }

  const onStopClick = ()=>{
    sub.next({isPaused: true, value: 0})
  }

  const onWaitClick = () => {
    sub.next({isPaused: true})
  }

  const onResetClick = () => {
    sub.next({value: 0})
  }

  return (

    <div className="App">
      <Timer 
        hours = {time.h}
        minutes = {time.m}
        seconds = {time.s}
        onStartClick = {onStartClick}
        onWaitClick = {onWaitClick}
        onStopClick = {onStopClick}
        onResetClick = {onResetClick}
      />

    </div>

  );
}

export default App;