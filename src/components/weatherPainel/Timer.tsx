import { useEffect, useState } from "react"

function Timer() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(intervalId)
    }, [])

    const timeFormate = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes}`
    }


    return (
        <div>
            <h1>{timeFormate(time)}</h1>
        </div>
    )
}

export default Timer