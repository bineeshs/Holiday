# Holiday Management Application

This is a **Holiday Management Application** that integrates with the [Calendarific API](https://calendarific.com/) to fetch and display holiday data for a selected country and year.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
   - [Backend Setup (Django)](#backend-setup-django)
   - [Frontend Setup (React)](#frontend-setup-react)
5. [Environment Variables](#environment-variables)
6. [How to Run the Application](#how-to-run-the-application)
7. [Bonus Features](#bonus-features)
8. [Notes](#notes)

---

## Overview

The goal of this project is to build a **Holiday Management Application** that fetches holiday data using the Calendarific API. It enables users to search, filter, and display holidays based on their chosen **country** and **year**.

The project consists of:
- A **Django backend** that fetches and serves holiday data via REST APIs.
- A **React frontend** that interacts with the Django backend and displays the data in a responsive user interface.

---

## Features

### Core Features:
1. **Country and Year Selection**:
   - Select a country using the ISO 3166-1 alpha-2 country codes.
   - Choose a year to fetch holidays.
2. **Holiday List**:
   - View a list of holidays for the selected country and year.
3. **Search and Filter**:
   - Search for holidays by name (e.g., "Christmas").
   - Filter holidays by month.
4. **Holiday Details**:
   - View detailed information (name, description, type, and date) in a modal.
5. **Caching**:
   - Cache holiday data for a country-year combination for **24 hours** to minimize API requests.

### Bonus Features:
- Filter holidays by **type** (e.g., National, Religious).
- Date range picker for filtering holidays by date.
- Pagination for long holiday lists (exceeding 10 holidays).

---

## Technologies Used

### Backend:
- **Django** (Web framework)
- **Django REST Framework** (API development)
- **SQLite** (Database)
- **Django Caching Framework**

### Frontend:
- **React** (Frontend library)
- **Axios** (HTTP requests)
- **Tailwind CSS** (Styling framework)

---

## Setup Instructions

### Prerequisites:
- **Node.js** and **npm** installed for React.
- **Python 3.x** installed for Django.
- Calendarific API key from [Calendarific](https://calendarific.com/).

---

### Backend Setup (Django)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python3 -m venv env
   source env/bin/activate  # For Windows: env\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**:
   - Create a `.env` file in the `backend` folder.
   - Add the Calendarific API key:
     ```
     CALENDARIFIC_API_KEY=your_api_key_here
     ```

5. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Start the server**:
   ```bash
   python manage.py runserver
   ```

---

### Frontend Setup (React)

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

---

## Environment Variables

For the **backend**, add the Calendarific API key in the `.env` file:
```
CALENDARIFIC_API_KEY=your_api_key_here
```

---

## How to Run the Application

1. Start the **backend server**:
   ```bash
   python manage.py runserver
   ```

2. Start the **frontend development server**:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. Use the search form to select a **country** and **year** to fetch holidays.

---

## Bonus Features

- **Date Range Picker**: Filter holidays by a date range.
- **Type Filtering**: Filter holidays by type (e.g., National, Religious).
- **Pagination**: Holidays are paginated if the list exceeds 10 results.

---

## Notes

- The holiday data is **cached for 24 hours** for each country-year combination to minimize API usage.
- Tailwind CSS ensures the application is fully **responsive** for both desktop and mobile users.
- Handle any errors gracefully, including invalid API requests.
- live demo: http://16.170.212.63/

---

## License

This project is licensed under the MIT License.
