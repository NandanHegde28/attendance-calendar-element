import type { Dispatch, SetStateAction } from "react";
import type { CalendarState } from "../calendarState"

export type Props = {
    calendarState: CalendarState;
    setCalendarState: Dispatch<SetStateAction<CalendarState>>;
}