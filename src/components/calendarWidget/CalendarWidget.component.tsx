import { useState, type JSX } from "react";
import type { CalendarState } from "../../utils/calendarState";
import DayView from "../dayView/DayView.component";
import MonthView from "../monthView/MonthView.component";
import YearView from "../yearView/YearView.component";

function CalendarWidget() {
  const today: Date = new Date();
  const [calendarState, setCalendarState] = useState<CalendarState>({
    view: "Days",
    isOpen: false,
    selectedDate: today,
  });

  const viewMap: Record<CalendarState["view"], () => JSX.Element> = {
    Days: () => {
      return (
        <DayView
          calendarState={calendarState}
          setCalendarState={setCalendarState}
        />
      );
    },
    Month: () => {
      return (
        <MonthView
          calendarState={calendarState}
          setCalendarState={setCalendarState}
        />
      );
    },
    Year: () => {
      return (
        <YearView
          calendarState={calendarState}
          setCalendarState={setCalendarState}
        />
      );
    },
  };
  return <>{viewMap[calendarState.view]()}</>;
}
export default CalendarWidget;
