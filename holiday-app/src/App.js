import React, { useState } from "react";
import HomePage from "./components/HomePage";
import HolidayListPage from "./components/HolidayListPage";

function App() {
  const [holidays, setHolidays] = useState([]);
  const [searchParams, setSearchParams] = useState({ country: "", year: "" });

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-100" },
    React.createElement(HomePage, {
      setHolidays: setHolidays,
      setSearchParams: setSearchParams,
    }),
    holidays.length > 0 &&
      React.createElement(HolidayListPage, {
        holidays: holidays,
        searchParams: searchParams,
      })
  );
}

export default App;
