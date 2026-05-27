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
- npm run start: launches the server on localhost:3002
- npm run dev: launches the server on localhost:3002 with hot reload
- npm run lint: runs ESLint from the command line

## MongoDB Compass Setup
1. Start your local MongoDB service.
2. In MongoDB Compass, connect using your local connection (example: `mongodb://127.0.0.1:27017`).
3. In the project root, create a `.env` file based on `.env.example`.
4. Set `MONGO_URI` to your Compass connection string with database name, for example:
	`MONGO_URI=mongodb://127.0.0.1:27017/wtwr_db?directConnection=true`
5. Start the API with `npm run dev`.

The server also accepts `MONGODB_URI` or `DATABASE_URL` if you already use those variable names.

## Access Information
- Backend GitHub repository: https://github.com/JohyMoney/se_project_express
- Frontend GitHub repository: https://github.com/JohyMoney/se_project_react

## Deployment Links (WTWR)
- Deployed backend domain (public API URL): https://.vercel.app
- Backend Vercel deployment page (dashboard): https://vercel.com/john-mahoney-s-projects/se-project-react/4N75Qpv7yWBtaZGxyxXVLL8aVM4o
- Deployed frontend domain (primary): https://se-project-react-o24ike9oz-john-mahoney-s-projects.vercel.app/
- Deployed frontend domain (alias): https://se-project-react-hazel.vercel.app/

## Project Pitch Video (Required)
- Pitch video link: https://youtu.be/EkDSfpUUMXE

The project pitch video is required and should be about this WTWR project.

Recommended structure (max 5 minutes, camera required):
- Beginning (30-60 sec): introduce yourself and the WTWR project, and state the goal/problem.
- Middle (2.5-3 min): explain 2-3 key implementation decisions, 1-2 challenges and how you solved them, and mention responsible AI usage if applicable.
- End (30-60 sec): summarize results, lessons learned, and possible future improvements.

## Media
- Screenshots/GIFs: add screenshots of key API behavior or Postman results here
- Video Demo: https://youtu.be/EkDSfpUUMXE

## Notes
Before committing, update sprint.txt in the project root with your current sprint number.
