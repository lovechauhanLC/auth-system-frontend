# Auth System Frontend

This repository contains the **frontend application** for a custom authentication system built using **React + Vite**.  
It handles user authentication flows such as login, registration, session handling, and protected routes, and communicates with a backend authentication API using JWT.

---

## Features

- User Login (email & password)
- User Registration (signup)
- Forgot / Reset Password flow (backend-driven)
- JWT-based authentication
- Auth Context for global authentication state
- Protected routes (accessible only after login)
- Logout functionality
- Clean and minimal UI

---

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- Fetch / Axios (for API calls)
- CSS / Tailwind CSS (based on implementation)

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- A running **authentication backend** (custom API)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/lovechauhanLC/auth-system-frontend.git
cd auth-system-frontend
npm install
```

---

## Environment Setup

Create a `.env` file in the root directory and add the backend API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Replace the URL with your actual authentication backend endpoint.

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the application in development mode with hot reload enabled.

---

### Build for Production

```bash
npm run build
```

Generates an optimized production build inside the `dist/` directory.

---

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

---

## Authentication Flow

### Login

1. User submits email and password
2. Frontend sends request to backend `/auth/login`
3. Backend validates credentials
4. Backend returns a JWT token
5. Token is stored in browser storage
6. Authentication state is updated globally

---

### Protected Routes

Protected routes are rendered only when the user is authenticated.

Example:

```jsx
{isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
```

---

## Sample API Usage

### Login Request

```js
fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});
```

---

### Register Request

```js
fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    name,
  }),
});
```

---

## Project Structure

```text
src/
├── components/        # Reusable UI components
├── context/           # Authentication context
├── hooks/             # Custom hooks (useAuth, etc.)
├── pages/             # Login, Register, Dashboard pages
├── services/          # API service files
├── styles/            # CSS / Tailwind styles
├── App.jsx
├── main.jsx
```

---

## Backend Dependency

This frontend depends on a backend authentication system that provides:

- Login API
- Registration API
- JWT token handling
- Password reset endpoints
- Session validation

All security and validation logic must be handled by the backend.

---

## Contributing

Contributions are welcome.  
Feel free to open an issue or submit a pull request for improvements or bug fixes.

---

## License

This project is open-source and free to use.