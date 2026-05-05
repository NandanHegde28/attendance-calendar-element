import { months } from "../../utils/months";
import type { Props } from "../../utils/types/types";
import style from "../monthView/MonthView.module.css";

function MonthView({ calendarState, setCalendarState }: Props) {
  const today: Date = new Date();

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

  const handleYearViewClick = () => {
    setCalendarState((prev) => ({
      ...prev,
      view: "Year",
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

  const handleMonthBtnClick = (month: number) => {
    setCalendarState((prev) => {
      const year = prev.selectedDate.getFullYear();
      const day = prev.selectedDate.getDate();

      const maxDays = new Date(year, month + 1, 0).getDate();

      return {
        ...prev,
        selectedDate: new Date(year, month, Math.min(day, maxDays)),
        view: "Days",
      };
    });
  };

  return (
    <>
      <div className={style.calender}>
        <div className={style.month_view}>
          <div className={style.header}>
            <button
              className={style.button}
              onClick={() => {
                handlePrevYear();
              }}
            >
              {"<"}
            </button>
            <h2
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleYearViewClick();
              }}
            >
              {calendarState.selectedDate.getFullYear()}
            </h2>
            <button
              className={style.button}
              onClick={() => {
                handleNextYear();
              }}
            >
              {">"}
            </button>
          </div>

          <div className={style.container}>
            {months.map((m, index) => (
              <button
                onClick={() => handleMonthBtnClick(index)}
                key={index}
                className={`${style.monthCard} ${
                  index === calendarState.selectedDate.getMonth() &&
                  calendarState.selectedDate.getFullYear() ===
                    today.getFullYear()
                    ? style.selected
                    : ""
                } ${index === today.getMonth() ? style.current : ""}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default MonthView;
