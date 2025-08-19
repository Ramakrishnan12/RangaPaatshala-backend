# TypeScript Backend Application

## Overview
This project is a TypeScript-based backend application that utilizes Express and MongoDB. It provides a simple API for managing user data, including creating and retrieving user records.

## Project Structure
```
typescript-backend-app
├── src
│   ├── app.ts                # Entry point of the application
│   ├── config
│   │   └── mongodb.ts        # MongoDB connection configuration
│   ├── controllers
│   │   └── apiController.ts   # API request handlers
│   ├── models
│   │   └── userModel.ts      # Mongoose user model
│   ├── routes
│   │   └── apiRoutes.ts      # API route definitions
│   └── types
│       └── index.ts          # TypeScript interfaces
├── package.json               # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd typescript-backend-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure MongoDB:**
   Update the MongoDB connection settings in `src/config/mongodb.ts` to match your database configuration.

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### Endpoints

- **GET /users**
  - Description: Retrieve a list of users.
  - Response: Returns an array of user objects.

- **POST /users**
  - Description: Create a new user.
  - Request Body: JSON object containing user details (name, email, password).
  - Response: Returns the created user object.

## License
This project is licensed under the MIT License.