import {useState } from "react";
import Clock from "./Clock";
import moment, { Moment } from "moment";
import { v4 } from "uuid";

export default function Bord(){

    const [watches, setWatches] = useState([{ name: "Москва", time : moment(), id: v4()}])

    const timeValidate = (time: string) => {return /[+-]?([0-1]?[0-9]?):?([0-5][0-9]?)/.test(time)}

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const timeDif  = event.target?.gmt.value 
        if (!timeValidate(timeDif)){
            alert("Не верно заполнено время. Введите в формате +-hh или +-hh:mm")
            setWatches(watches)
            event.target.reset()
            return 
        }
        const timeZone: Moment = moment()
        timeZone.subtract(3, "h")
        const times = timeDif.slice(1).split(":")

        
        if (timeDif.startsWith("+")){
            timeZone.add(times[0], "h")
            timeZone.add(times[1], "m")
            
        }

        if (timeDif.startsWith("-")){
            timeZone.subtract(times[0], "h")
            timeZone.subtract(times[1], "m")
            
        }
        
        setWatches([...watches, { name: event.target?.name.value, time: timeZone, id: v4()}])
        event.target.reset()
        
    }

    return (
        <div className="time__wrapper">
            <form className="time" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Название</label>
                    <input type="text" id="name" placeholder="Введите название"/>
                </div>
                <div>
                <label htmlFor="gmt">Временная зона</label>
                    <input type="text" id="gmt" placeholder="+-00:00" />
                </div>
                <button>Добавить</button>
            </form>


            <Clock watches={watches} setWatches={setWatches}/>

            
        </div>
    )
}