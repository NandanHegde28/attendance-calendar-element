import { useMemo } from "react";
import { months } from "../../utils/months";
import type { Props } from "../../utils/types/types";
import style from "../dayView/DayView.module.css";
import { weeks } from "../../utils/weeks";

function DayView({ calendarState, setCalendarState }: Props) {
  const today: Date = new Date();

  const daysArray: number[] = useMemo(() => {
    const monthEndDate: number = new Date(
      calendarState.selectedDate.getFullYear(),
      calendarState.selectedDate.getMonth() + 1,
      0,
    ).getDate();
    return Array.from({ length: monthEndDate }, (_, i) => i + 1);
  }, [calendarState.selectedDate]);

  const blankArray = useMemo(() => {
    const monthStartDate: number = new Date(
      calendarState.selectedDate.getFullYear(),
      calendarState.selectedDate.getMonth(),
      1,
    ).getDay();
    const blankDateField: number =
      monthStartDate === 0 ? 6 : monthStartDate - 1;
    return Array.from({ length: blankDateField });
  }, [calendarState.selectedDate]);

  const handlePrevYear = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear() - 1,
        prev.selectedDate.getMonth(),
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handlePrevMonth = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear(),
        prev.selectedDate.getMonth() - 1,
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handleNextMonth = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear(),
        prev.selectedDate.getMonth() + 1,
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handleNextYear = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear() + 1,
        prev.selectedDate.getMonth(),
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handleMonthClick = () => {
    setCalendarState((prev) => ({
      ...prev,
      view: "Month",
    }));
  };
  return (
    <>
      <div className={style.calender}>
        <div className={style.month_view}>
          <div className={style.header}>
            <button className={style.button} onClick={handlePrevYear}>
              {"<<"}
            </button>
            <button className={style.button} onClick={handlePrevMonth}>
              {"<"}
            </button>

            <h2
              onClick={handleMonthClick}
            >{`${months[calendarState.selectedDate.getMonth()]} - ${calendarState.selectedDate.getFullYear()}`}</h2>

            <button className={style.button} onClick={handleNextMonth}>
              {">"}
            </button>

            <button className={style.button} onClick={handleNextYear}>
              {">>"}
            </button>
          </div>

          <div className={style.weekDays}>
            {weeks.map((week, index) => (
              <span key={`week-${index}`}>{week}</span>
            ))}
          </div>
          <div className={style.monthDays}>
            {blankArray.map((_, i) => (
              <span key={`blank-${i}`} className={style.empty}></span>
            ))}
            {daysArray.map((day) => {
              const isToday =
                day === today.getDate() &&
                today.getMonth() === calendarState.selectedDate.getMonth() &&
                today.getFullYear() ===
                  calendarState.selectedDate.getFullYear();
              const selectedDay = day === calendarState.selectedDate.getDate();
              return (
                <button
                  key={day}
                  className={`${style.day} ${isToday ? style.currDay : ""} ${selectedDay ? style.selectedDay : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default DayView;
