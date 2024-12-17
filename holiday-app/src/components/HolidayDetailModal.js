import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function HolidayDetailModal({ holiday, onClose }) {
  return React.createElement(
    Modal,
    {
      isOpen: !!holiday,
      onRequestClose: onClose,
      contentLabel: "Holiday Details",
      className: "bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10",
      overlayClassName:
        "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",
    },
    React.createElement(
      "h3",
      { className: "text-2xl font-bold mb-2" },
      holiday.name
    ),
    React.createElement("p", null, `Date: ${formatDate(holiday.date.iso)}`),
    React.createElement("p", null, `Type: ${holiday.type.join(", ")}`),
    React.createElement(
      "p",
      null,
      `Description: ${holiday.description || "N/A"}`
    ),
    React.createElement(
      "button",
      {
        onClick: onClose,
        className: "mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",
      },
      "Close"
    )
  );
}

export default HolidayDetailModal;
