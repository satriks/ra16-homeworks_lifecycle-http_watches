import { Moment } from "moment"
import dial from "../assets/clock2.png"
import arrow from "../assets/min.png" 
import sec from "../assets/sec.png" 
import { SetStateAction, useEffect } from "react"

interface Props {
    watches : {name:string, time: Moment, id: string}[],
    setWatches : React.Dispatch<SetStateAction<{name:string, time: Moment, id : string}[]>>
}


export default function Clock({watches, setWatches}: Props){

    

    const delWatch = (event: React.MouseEvent<HTMLButtonElement>) => {
        setWatches(watches.filter(el => el.id != event.target.parentElement.id))
    }

    
    useEffect(() => {

            const currentWatches = [...watches]

            const timeout = setTimeout(()=> {
                currentWatches.forEach(el => el.time.add(1, "s"))
                setWatches(currentWatches)
                }, 1000  )   

            
            return ( () => window.clearTimeout(timeout))},

        
     [watches, setWatches])

    
    

    
    return(
        <div className="time__watch">

            {watches.map((el) =>{ return(
            
            <div className="clock" key={el.id} id={el.id}>
                <h2 className="clock__name">{el.name}</h2>
                <img src={dial}/>
                <img src={sec} className="clock__second" style={{transform: `rotate(${(el.time.second() - (watches.length - 1 ))*6 + "deg"})`}}/>
                <img src={arrow} className="clock__minute" style={{transform: `rotate(${el.time.minute()*6 + "deg"})`}}/>
                <img src={arrow} className="clock__hour" style={{transform: `rotate(${(el.time.hour() + el.time.minute()/60)*30 + "deg"})`}}/>
                <button 
                    className="clock__close" 
                    onClick={delWatch}
                >
                X
                </button>
            </div>
            )})}
        </div>
    )
}



