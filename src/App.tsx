import type { JSX } from "react";
import "./App.css";
import CalendarWidget from "./components/calendarWidget/CalendarWidget.component.tsx";

function App(): JSX.Element {
  return (
    <>
      <CalendarWidget />
    </>
  );
}

export default App;
