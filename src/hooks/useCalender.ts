import { useState } from "react";
import type { CalendarState } from "../utils/calendarState.ts";

export function useCalender() {
    const [calendarState, setCalendarState] = useState<CalendarState>({
        view: "Days",
        selectedDate: new Date(),
        isOpen: false
    })

    const updateDate = (yearOffset: number = 0, monthOffset: number = 0) => {
        setCalendarState((prev) => {
            const current = prev.selectedDate;

            const targetYear = current.getFullYear() + yearOffset;
            const targetMonth = current.getMonth() + monthOffset;

            const maxDay = new Date(
                targetYear,
                targetMonth + 1,
                0
            ).getDate()

            const safeday = Math.min(current.getDate(), maxDay);

            return {
                ...prev,
                selectedDate: new Date(
                    targetYear,
                    targetMonth,
                    safeday
                )
            }
        })
    }

    const nextMonth = () => updateDate(0, 1);
    const prevMonth = () => updateDate(0, -1);
    const nextYear = () => updateDate(1, 0);
    const prevYear = () => updateDate(-1, 0);

    const selectDay = (day: number) => {
        setCalendarState((prev) => ({
            ...prev,
            selectedDate: new Date(
                prev.selectedDate.getFullYear(),
                prev.selectedDate.getMonth(),
                day
            )
        }))
    }

    const selectMonth = (month: number) => {
        setCalendarState((prev) => {
            const maxDay = new Date(prev.selectedDate.getFullYear(), month + 1, 0).getDate();
            const safeDate = Math.min(prev.selectedDate.getDate(), maxDay);
            return {
                ...prev,
                selectedDate: new Date(
                    prev.selectedDate.getFullYear(),
                    month,
                    safeDate
                ),
            }
        })
    }

    const selectYear = (year: number) => {
        setCalendarState((prev) => {
            const month = prev.selectedDate.getMonth();
            const maxDay = new Date(prev.selectedDate.getFullYear(), month + 1, 0).getDate();
            const safeDate = Math.min(prev.selectedDate.getDate(), maxDay);
            return {
                ...prev,
                selectedDate: new Date(
                    year,
                    month,
                    safeDate
                )
            }
        })
    }

    const changeView = (view: CalendarState['view']) => {
        setCalendarState((prev) => ({
            ...prev,
            view
        }))
    }

    const toggelDetail = () => {
        setCalendarState((prev) => ({
            ...prev,
            isOpen: !prev.isOpen
        }))
    }
    return {
        calendarState,
        setCalendarState,

        nextMonth,
        prevMonth,

        nextYear,
        prevYear,

        selectDay,
        selectMonth,
        selectYear,

        changeView,
        toggelDetail
    }
}