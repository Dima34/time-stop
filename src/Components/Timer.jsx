import React, { PureComponent } from 'react'
import styles from './styles.module.scss'


const Timer = ({hours, minutes, seconds, onStartClick, onStopClick, onWaitClick, onResetClick}) => { 

    const DblClickCheck = (e,func) =>{
        const target = e.target

        if(target.hasAttribute("dbcheck")){
            func();
            target.removeAttribute("dbcheck")
        } else{
            target.setAttribute("dbcheck", "");
            setTimeout(()=>{
                target.removeAttribute("dbcheck")
            }, 300);
        }       

    }
    
    return (
        <div className = {styles.timerContainer}>

            <section className={styles.timer}>

                <div className={styles.clock}>

                    <section>
                        <p>{hours}</p>
                        <p>Hours</p>
                    </section>

                    <span>:</span>

                    <section>
                        <p>{minutes}</p>
                        <p>Minutes</p>
                    </section>

                    <span>:</span>

                    <section>
                        <p>{seconds}</p>
                        <p>Seconds</p>
                    </section>
                    
                </div>

                <div className={styles.buttons}>
                    <button 
                        onClick={()=>{onStartClick()}}
                    >
                        Start
                    </button>

                    <button 
                        onClick={()=>{onStopClick()}} 
                    >
                        Stop
                    </button>

                    <button 
                        onClick={(e)=>{DblClickCheck(e,onWaitClick)}} 
                    >
                        Wait
                    </button>
                    
                    <button 
                        onClick={()=>{onResetClick()}}
                    >
                        Reset
                    </button>
                </div>

            </section>

        </div>

    )
    
}

export default Timer
