import { useMemo } from "react";
import type { Props } from "../../utils/types/types";
import style from "../yearView/YearView.module.css";

function YearView({ calendarState, setCalendarState }: Props) {
  const today: Date = new Date();
  
  const yearList = useMemo(() => {
    const selectedyear = calendarState.selectedDate.getFullYear();
    return Array.from({ length: 24 }, (_, i) => selectedyear - 12 + i);
  }, [calendarState.selectedDate]);

  const handlePrevYear = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear() - 10,
        prev.selectedDate.getMonth(),
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handleBackToMonthView = () => {
    setCalendarState((prev) => ({
      ...prev,
      view: "Month",
    }));
  };

  const handleNextYear = () => {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new Date(
        prev.selectedDate.getFullYear() + 10,
        prev.selectedDate.getMonth(),
        prev.selectedDate.getDate(),
      ),
    }));
  };

  const handleOnYearClick = (year: number) => {
    setCalendarState((prev) => {
      const month = prev.selectedDate.getMonth();
      const day = prev.selectedDate.getDate();

      const maxDays = new Date(year, month + 1, 0).getDate();

      return {
        ...prev,
        selectedDate: new Date(year, month, Math.min(day, maxDays)),
        view: "Month",
      };
    });
  };

  return (
    <>
      <div className={style.calender}>
        <div className={style.year_view}>
          <div className={style.header}>
            <button className={style.button} onClick={handlePrevYear}>
              {"<"}
            </button>
            <h2 style={{ cursor: "pointer" }} onClick={handleBackToMonthView}>
              {`${yearList[0]}-${yearList[yearList.length - 1]}`}
            </h2>
            <button className={style.button} onClick={handleNextYear}>
              {">"}
            </button>
          </div>

          <div className={style.container}>
            {yearList.map((year) => (
              <button
                key={year}
                className={`${style.yearCard} ${
                  year === today.getFullYear() ? style.current : ""
                } ${year === calendarState.selectedDate.getFullYear() ? style.selected : ""}`}
                onClick={() => handleOnYearClick(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default YearView;
