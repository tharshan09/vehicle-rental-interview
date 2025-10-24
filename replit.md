# Vehicle Rental Management System

## Project Overview
A fullstack interview exercise application for managing vehicle rentals. Built with React + TypeScript (Vite) frontend and FastAPI (Python) backend, featuring an in-memory data store for simplicity.

## Domain Context
The application manages a rental company that rents vehicles (cars, vans, trucks) to customers.

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Validation**: Pydantic with EmailStr validation
- **Server**: Uvicorn with hot reload
- **Data Storage**: In-memory Python lists
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Framework**: React 18
- **Language**: TypeScript with strict mode
- **Build Tool**: Vite 7
- **HTTP Client**: Axios
- **Styling**: Custom CSS (no frameworks)

## Project Structure

```
backend/
├── main.py           - FastAPI app with API endpoints
├── models.py         - Pydantic data models
├── data_store.py     - In-memory data storage
└── requirements.txt  - Python dependencies

frontend/
├── src/
│   ├── components/
│   │   ├── CustomerList.tsx       - Display customers
│   │   ├── VehicleList.tsx        - Display vehicles with maintenance toggle
│   │   ├── RentalList.tsx         - Display rentals with joined data
│   │   └── CreateRentalForm.tsx   - Create new rentals
│   ├── types.ts      - TypeScript type definitions
│   ├── api.ts        - Axios API client
│   ├── App.tsx       - Main application component
│   └── App.css       - Application styling
├── index.html
└── package.json
```

## Features Implemented

### Backend API Endpoints
- `GET /customers` - List all customers
- `GET /vehicles` - List all vehicles
- `GET /rentals` - List all rentals
- `POST /rentals` - Create new rental with validation
- `PATCH /vehicles/{id}/maintenance` - Set vehicle to maintenance status

### Frontend Components
- Customer list with table display
- Vehicle list with status indicators and maintenance buttons
- Rental list with customer/vehicle lookup
- Create rental form with dropdown selection and validation

### Data Validation
- Email validation using Pydantic EmailStr
- Vehicle availability check before rental creation
- Customer/Vehicle ID validation
- Status validation (available, rented, maintenance)

## Running the Application

### Backend
Port: 8000
Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

### Frontend
Port: 5000
Command: `cd frontend && npm run dev`

## Sample Data
- 3 customers (John Doe, Jane Smith, Bob Johnson)
- 5 vehicles (Cars, Vans, Trucks in various states)
- 1 existing rental

## Code Quality Features
- Type safety (TypeScript + Pydantic)
- Proper error handling with user-friendly messages
- Component-based architecture
- RESTful API design
- Clean separation of concerns
- Validation at both frontend and backend

## Recent Changes
- 2025-10-23: Initial project setup with complete CRUD operations for rentals
- Fixed TypeScript type-only import errors for verbatimModuleSyntax compliance
- Added CORS support for cross-origin requests
- Configured Vite to bind to 0.0.0.0:5000 for proper hosting
- Implemented date validation with Pydantic (date types + start<=end validation)
- Added automatic vehicle list refresh after rental creation
- Updated data models to use proper date objects instead of strings

## Status
✅ Application fully functional and ready for code review
✅ Both workflows running successfully
✅ All API endpoints tested and working
✅ Frontend displaying data correctly
✅ Date validation implemented (format + ordering)
✅ Vehicle availability auto-refresh working
✅ All requirements from specifications met
