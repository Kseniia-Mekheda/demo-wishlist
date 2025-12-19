# :scroll: Demo Wishlist

A simple and functional web application for managing a wishlist, built with React 19, TypeScript, and Vite. The project uses JSON Server as a mock backend and Tailwind CSS for styling.

## :computer: Technologies Used
* **Frontend:** React 19 (Hooks, Context API), TypeScript
* **Routing:** React Router DOM v7.
* **Styles:** Tailwind CSS
* **Mock Backend:** JSON Server
* **Build Tool:** Vite

## :trophy: Features
* **CRUD Operations:** Add, view, edit and delete wishes
* **Responsive Design:** Optimized for various screen sizes using Tailwind CSS
* **Filtering:** Filter wishes by date or price
* **Pagination:** Smooth navigation through the list of wishes

## :rocket: Getting started
**Before you start:**
Make sure you have Node.js and npm installed on your machine.

**Installation:**
1. Clone the repository:
```bash
  git clone <repository-url>
  cd demo-wishlist
```
2. Install dependencies:
```bash
  npm install
```
**Run the project:**
1. Start the server:
```bash
  npm run server
```
This will start the backend server on http://localhost:3000.

2. Start Vite development server:
```bash
  npm run dev
```
The application will be available at http://localhost:5173.

## :clipboard: Project Structure
* src/components: Reusable UI components (WishCard, Pagination, WishForm, etc.)
* src/context: Application state management using Context API
* src/hooks: Custom hooks for API calls and context access
* src/pages: Main application views (Dashboard, WishPage, 404)
* src/utilities: Helper functions for formatting and query building
* db.json: Database file for the mock backend
