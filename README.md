# Todo App

A full-stack todo application built with React (frontend) and Spring Boot (backend) with MongoDB integration.

## Tech Stack

### Frontend
- **React** 19.1.0
- **TypeScript** 5.8.3
- **Vite** 7.0.4
- **ESLint** for code linting

### Backend
- **Spring Boot** 3.5.0
- **Java** 17
- **MongoDB** for data persistence
- **Gradle** for build management

## Project Structure

```
todo-app/
├── frontend/
│   └── app/              # React frontend application
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.ts
└── backend/
    └── artif/            # Spring Boot backend
        ├── src/
        ├── build.gradle
        └── settings.gradle
```

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Java 17 (for backend)
- MongoDB (for database)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/artif
   ```

2. Run the application:
   ```bash
   ./gradlew bootRun
   ```

3. Build the project:
   ```bash
   ./gradlew build
   ```

4. Run tests:
   ```bash
   ./gradlew test
   ```

## API Endpoints

The backend provides RESTful endpoints for todo management:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/{id}` - Get a specific todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Development

### Frontend Development
- The frontend runs on Vite's development server
- Hot module replacement is enabled for fast development
- ESLint is configured for code quality

### Backend Development
- Spring Boot with auto-restart enabled
- MongoDB integration for data persistence
- RESTful API architecture

## Available Scripts

### Frontend (`frontend/app/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (`backend/artif/`)
- `./gradlew bootRun` - Run the application
- `./gradlew build` - Build the project
- `./gradlew test` - Run tests
- `./gradlew clean` - Clean build artifacts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.