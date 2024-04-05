## Task Buddy Server

### Technologies Used
- **Node.js:** A versatile JavaScript runtime for building server-side applications.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **Mongoose:** An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- **TypeScript:** Enhances code quality and maintainability through static typing.
- **JWT:** JSON Web Tokens for secure authentication.

### Base URL
- Base URL: [https://task-manager-server-seven-plum.vercel.app](https://task-manager-server-seven-plum.vercel.app)

### Endpoints

#### Task Endpoints

##### CRUD Endpoints
- **POST** `/api/v1/task/create`: Create a new task
- **GET** `/api/v1/task/get`: Get all tasks
- **GET** `/api/v1/task/:id`: Get a single task by ID
- **DELETE** `/api/v1/task/:id`: Delete a task by ID
- **PUT** `/api/v1/task/:id`: Mark a task as important
- **PUT** `/api/v1/task/status/:id`: Mark a task as completed
- **PATCH** `/api/v1/task/:id`: Update a task

#### User Endpoints

##### CRUD Endpoints
- **POST** `/api/v2/user/create`: Create a new user
- **GET** `/api/v2/user/get`: Get all users
- **GET** `/api/v2/user/:id`: Get a single user by ID
- **DELETE** `/api/v2/user/:id`: Delete a user by ID
- **PATCH** `/api/v2/user/:id`: Update a user

#### Authentication Endpoints

- **POST** `/user/login`: Authenticate user login

### Pagination
Pagination implemented for efficient handling of large datasets.

## To run the application locally, follow these steps

- Clone the repository to your local machine
- Navigate to the project directory in your terminal or command prompt.
- Run the command npm install to install the necessary dependencies
- Once the dependencies are installed, execute npm run dev to start the application locally