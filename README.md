# Vehicle Rental Management System

A fullstack application for managing vehicle rentals, built with React + TypeScript (Vite) on the frontend and FastAPI (Python) on the backend.

## Project Structure

```
.
├── backend/               # FastAPI backend
│   ├── main.py           # API endpoints
│   ├── models.py         # Pydantic data models
│   └── data_store.py     # In-memory data storage
├── frontend/             # React + TypeScript frontend
│   └── src/
│       ├── components/   # React components
│       │   ├── CustomerList.tsx
│       │   ├── VehicleList.tsx
│       │   ├── RentalList.tsx
│       │   └── CreateRentalForm.tsx
│       ├── types.ts      # TypeScript type definitions
│       ├── api.ts        # API client
│       ├── App.tsx       # Main application
│       └── App.css       # Styling
└── README.md
```

## Features

### Backend (FastAPI)
- **GET /customers** - List all customers
- **GET /vehicles** - List all vehicles
- **GET /rentals** - List all rentals
- **POST /rentals** - Create a new rental (validates vehicle availability)
- **PATCH /vehicles/{id}/maintenance** - Set vehicle to maintenance status

### Frontend (React)
- **Customer List** - View all registered customers
- **Vehicle List** - View all vehicles with status indicators (available, rented, maintenance)
- **Rental List** - View all rentals with customer and vehicle details
- **Create Rental Form** - Create new rentals with validation
- **Vehicle Maintenance** - Toggle vehicle maintenance status

## Data Models

### Customer
- `id` (number)
- `name` (string)
- `email` (string, validated)

### Vehicle
- `id` (number)
- `type` (string: Car, Van, Truck)
- `status` ("available" | "rented" | "maintenance")

### Rental
- `id` (number)
- `customerId` (number)
- `vehicleId` (number)
- `startDate` (date, YYYY-MM-DD format, validated)
- `endDate` (date, YYYY-MM-DD format, validated - must be >= startDate)

## Running the Application

### Prerequisites
- Python 3.11+
- Node.js 20+

### Backend Setup
```bash
cd backend
uv add fastapi uvicorn pydantic email-validator
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend will be available at http://localhost:8000

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:5000

## API Error Handling

The backend returns proper error messages for:
- **404 Not Found** - When customer or vehicle ID doesn't exist
- **400 Bad Request** - When attempting to rent an unavailable vehicle
- **422 Validation Error** - When date format is invalid or end date is before start date

The frontend displays these errors using alert dialogs and refreshes vehicle availability after successful operations.

## Technical Details

### Backend
- Uses Pydantic for data validation and type safety
- Date validation with proper format checking and start/end date ordering
- CORS enabled for cross-origin requests from frontend
- In-memory data store using Python lists
- Automatic vehicle status updates when creating rentals

### Frontend
- Built with Vite for fast development
- TypeScript for type safety
- Axios for API communication
- React hooks (useState, useEffect)
- Automatic vehicle list refresh after rentals and maintenance updates
- Minimal custom CSS styling
- Component-based architecture

## Sample Data

The application comes pre-loaded with:
- 3 customers (John Doe, Jane Smith, Bob Johnson)
- 5 vehicles (Cars, Vans, Trucks in various states)
- 1 existing rental

## Code Quality

This codebase is designed for code review sessions with:
- Clean, readable code structure
- Proper separation of concerns
- Type safety (TypeScript + Pydantic)
- Error handling
- Validation logic
- RESTful API design

## Future Enhancements

Possible improvements for code review exercises:
- Add rental completion/return functionality
- Implement date conflict validation
- Add customer and vehicle CRUD operations
- Enhance UI with better styling
- Add search and filtering
- Implement proper database persistence
