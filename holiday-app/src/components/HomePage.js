import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { enGB } from 'react-date-range/dist/locale';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';





function HomePage({ setHolidays, setSearchParams }) {
  const [country, setCountry] = useState(null);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [holidayType, setHolidayType] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    console.log(e.target.value, 'fdgfg', startDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleHolidayTypeChange = (selectedOption) => {
    setHolidayType(selectedOption);
  };

  const handleClear = () => {
    setCountry(""); 
    setYear(""); 
    setHolidays([]); 
    setErrorMessage(""); 
    setSelectedMonth("");
    setHolidayType("");
    setStartDate("");
    setEndDate("");

  };



  useEffect(() => {    
    setCountryOptions(countryList().getData());
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!country || !year) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Input',
        text: 'Please enter both country and year.',
        confirmButtonText: 'Ok',
      });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:8000/holiday/api/holidays/", {
        // params: { country: country.value, year, intMonth:  selectedMonth ? selectedMonth.value  },
        params: {
          country: country ? country.value : "",
          year,
          type: holidayType ? holidayType.value : "",
          month: selectedMonth ? selectedMonth.value : "",
          start_date: startDate ? new Date(startDate).toISOString().split("T")[0] : "",
          end_date: endDate ? new Date(endDate).toISOString().split("T")[0] : "",
        }
      });

      if (response.status === 200) {
        console.log('yesss');
        setHolidays(response.data.holidays);
        setErrorMessage("");
        setSearchParams({ country: country.label, year });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'warning',
            title: 'Message',
            text: 'No data Found',
            confirmButtonText: 'Ok',
          });
        } else if (error.response.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Message',
            text: 'No data Found',
            confirmButtonText: 'Ok',
          });
          setHolidays([]);

        } else {
          console.log(`Error ${error.response.status}`);

        }
      } else {
        console.log("Network or other error");
        setErrorMessage("Network error. Please try again.");
      }
    }

    finally {
      setLoading(false); // Set loading to false after the request is finished
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 m-6">
      <h1 className="text-2xl font-bold mb-4"
      style={{textAlign:"center",fontSize:"40px",paddingBottom:"1%"}}>Holiday Management</h1>
      <form
        className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4"
        onSubmit={handleSearch}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Country Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">Country*:</label>
            <Select
              value={country}
              onChange={setCountry}
              options={countryOptions}
              getOptionLabel={(e) => `${e.label} (${e.value})`}
              placeholder="Select Country"
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }),
              }}
            />
          </div>

          {/* Year Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">Year*:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g., 2024"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Month Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">Month:</label>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              options={months}
              placeholder="Select Month"
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }),
              }}
            />
          </div>

          {/* Holiday Type Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">Holiday Type:</label>
            <Select
              value={holidayType}
              onChange={setHolidayType}
              options={[
                { label: 'National holiday', value: 'National holiday' },
                { label: 'Religious', value: 'Optional holiday' },
              ]}
              placeholder="Select Holiday Type"
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }),
              }}
            />
          </div>

          {/* Start Date Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* End Date Filter */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-700">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Search Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
            <div className="flex justify-start">
              <button
                type="submit"
                className="w-full md:w-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Loading..." : "Search Holidays"}
              </button>

              {/* Clear Button */}
              <button
                type="button"
                className=" md:w-auto p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-2" 
                style={{ width: "100px" }}
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default HomePage;




