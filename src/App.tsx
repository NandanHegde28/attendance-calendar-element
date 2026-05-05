import type { JSX } from "react";
import "./App.css";
import CalendarWidget from "./components/calenderWidget/calendarWidget.component";

function App(): JSX.Element {
  return (
    <>
      <CalendarWidget />
    </>
  );
}

export default App;
