# Ashma Fire Safety - Admin Panel

A React-based admin dashboard for managing fire safety customers and projects.

## Tech Stack
- **React.js**: Framework
- **React Router DOM**: Navigation & Routing
- **Lucide React**: Icons
- **LocalStorage**: Data Persistence
- **Vanilla CSS**: Clean & Responsive UI

## Project Structure
- `src/admin/context`: Authentication context.
- `src/admin/pages`: All module pages (Login, Dashboard, Customers, Projects).
- `src/admin/components`: Reusable components (Sidebar, Layout, ProtectedRoute).
- `src/admin/utils`: Helper functions for localStorage.

## Features & Relationships
- **Authentication**: Simple login with `admin` / `123456`.
- **Customer Management**: Add and View customers.
- **Project Management**: 
  - Create projects and assign them to customers.
  - One customer can have multiple projects.
  - Track payments (Installments/Full) for each project.
- **Calculation Logic**:
  - `Total Paid`: Sum of all payment entries.
  - `Remaining`: Total Project Amount - Total Paid Amount.
  - Automatically updated on every payment entry.

## How to Run
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Login using `admin@ashma.com` / `admin123`.
