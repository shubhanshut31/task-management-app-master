import { useEffect, useState } from "react";
import "./Calendar.css";
import CalendarBox from "./CalendarBox";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
Date.MONTH_NAMES= [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];
let Monthindex = new Date().getMonth();
let yearIndex = new Date().getFullYear();
export default function Calendar({ dateState }) {

    const [boxes, setBoxes] = useState();
    const [showDateInfo, setShowDateInfo] = useState(Date.MONTH_NAMES[Monthindex] + " " + yearIndex);



    const daysIndex = () => {

        let jsx = [];
        const currentDate = new Date(yearIndex, Monthindex, 0);
        const day = currentDate.getDay();
        const currenMonth = Monthindex;
        currentDate.setDate(currentDate.getDate() + 1);
        let backwardIndex = 1;
        for (let i = 0; i < 42; i++) {
            if (Date.MONTH_NAMES[currentDate.getMonth()] !== Date.MONTH_NAMES[currenMonth]) {
                jsx.push(<CalendarBox key={i} value={currentDate.getDate()} selected={false} />);
                currentDate.setDate(currentDate.getDate() + 1);

            }
            else if (i >= day) {
                jsx.push(<CalendarBox key={i + 42} value={currentDate.getDate()} setDate={dateState} selected={true} />);
                currentDate.setDate(currentDate.getDate() + 1);

            }
            else {
                jsx.push(<CalendarBox key={i + 90} selected={false} value={new Date(yearIndex, Monthindex, 1 - ((day + 1) - backwardIndex)).getDate()} />);
                backwardIndex++;
            }

        }
        setBoxes(jsx);

    }


    const updateDate = (action) => {
        if (action === "right") {
            Monthindex++;
            if (Monthindex >= Date.MONTH_NAMES.length) {
                Monthindex = 0;
                yearIndex++;
            }
            setShowDateInfo(Date.MONTH_NAMES[Monthindex] + " " + yearIndex);


        }
        else {
            Monthindex--;
            if (Monthindex < 0) {
                Monthindex = Date.MONTH_NAMES.length - 1;
                yearIndex--;
            }
            setShowDateInfo(Date.MONTH_NAMES[Monthindex] + " " + yearIndex);
        }
    }
    useEffect(() => {
        daysIndex();
    }, [Monthindex]);
    return (
        <div id="calendar_container">

            <div id="calendar_header">
                <button className="calendar-btn" onClick={() => { updateDate("left") }}>
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <h5>{showDateInfo}</h5>
                <button className="calendar-btn" onClick={() => { updateDate("right") }}>
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>
            <div className="days_container">
                {
                    days.map((day, i) => <CalendarBox key={i} task={false} value={day} />)
                }
            </div>
            <div className="days_index_container">
                {
                    boxes
                }
            </div>

        </div>
    )
}
