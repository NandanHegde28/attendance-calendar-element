type CalendarView = 'Days' | 'Month' | 'Year';

export type CalendarState = {
    view: CalendarView;
    isOpen: boolean;
    selectedDate: Date;
}
