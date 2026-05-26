# WTWR (What to Wear?) Back End

## Project Description
This project is the backend API for WTWR. It provides user authentication and profile management, plus CRUD operations for clothing items. The API supports protected routes with JWT authorization, ownership checks, and centralized error handling.

## Functionality
- User signup and signin
- JWT-based authorization middleware
- Get and update current user profile
- Create, read, delete, like, and unlike clothing items
- Validation for request data in Mongoose schemas
- CORS support for frontend integration

## Technologies and Techniques
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication with jsonwebtoken
- Password hashing with bcryptjs
- Request security via authorization middleware
- Linting with ESLint (airbnb-base) and formatting with Prettier

## Running the Project
- npm run start: launches the server on localhost:3001
- npm run dev: launches the server on localhost:3001 with hot reload
- npm run lint: runs ESLint from the command line

## Access Information
- Backend GitHub repository: https://github.com/JohyMoney/se_project_express
- Frontend GitHub repository: https://github.com/JohyMoney/se_project_react
- Deployed backend domain: https://dotenvx.com/docs/introduction  or https://github.com/dotenvx/dotenvx#quickstart---
- Deployed frontend domain: www.dotenvx.com
- Project pitch video: https://youtu.be/6B3_WpUQEjE

## Media
- Screenshots/GIFs: add screenshots of key API behavior or Postman results here
- Video Demo: add a short demo link here

## Notes
Before committing, update sprint.txt in the project root with your current sprint number.
