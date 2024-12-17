import React, { useState } from "react";
import HolidayDetailModal from "./HolidayDetailModal";

function HolidayListPage({ holidays, searchParams }) {
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

 
  const [pagination, setPagination] = useState({
    currentPage: 1,
    holidaysPerPage: 10,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  
  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  
  const indexOfLastHoliday = pagination.currentPage * pagination.holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - pagination.holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

 
  const totalPages = Math.ceil(filteredHolidays.length / pagination.holidaysPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPagination((prevState) => ({ ...prevState, currentPage: pageNumber }));
    }
  };

  return (
    <div className="m-6 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Holidays for {searchParams.country.toUpperCase()} - {searchParams.year}
      </h2>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search Holidays"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>

      {/* Display Holidays */}
      {holidays.length > 0 ? (
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300 text-left">Country</th>
            <th className="p-2 border border-gray-300 text-left">Holiday Name</th>
            <th className="p-2 border border-gray-300 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentHolidays.length > 0 ? (
            currentHolidays.map((holiday, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedHoliday(holiday)}
              >
                <td className="p-2 border border-gray-300">{holiday.country.name}</td>
                <td className="p-2 border border-gray-300">{holiday.name}</td>
                <td className="p-2 border border-gray-300">{formatDate(holiday.date.iso)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No holidays found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
      ) : (
        <div>No holidays found.</div> 
      )}

      
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <span className="px-4 py-2">{pagination.currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Holiday Detail Modal */}
      {selectedHoliday && (
        <HolidayDetailModal
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
        />
      )}
    </div>
  );
}

export default HolidayListPage;

