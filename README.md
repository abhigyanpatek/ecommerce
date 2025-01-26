# [E-Commerce Platform Backend](https://ecommerce-qpsw.onrender.com/) 🛒

A robust e-commerce backend system built with Node.js, Express, and Sequelize, featuring secure authentication, product management, and shopping cart functionality.

## 🌟 Features

### Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin/Normal User)
- Token refresh mechanism
- Secure password hashing with bcrypt

### Product Management
- CRUD operations for products and categories
- Product search with keyword filtering
- Price range filtering
- Category-based product organization
- Bulk product creation support

### Shopping Cart
- Cart creation and management
- Add/remove products from cart
- Update product quantities
- Automatic cost calculation
- User-specific cart isolation

### User Management
- User registration with role assignment
- Secure login/logout system
- Profile management

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL/MySQL (configurable)
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **HTTP Client**: Axios

## 🏗 Architecture

The project follows a microservices architecture with two main services:

1. **E-commerce Service** (This repository)
   - Core business logic
   - Product management
   - Cart operations
   - User management

2. **Authentication Service** ([Repository](https://github.com/abhigyanpatek/auth-server
))
   - Token management
   - Authentication handling
   - Session control

## 🚀 Getting Started

### Prerequisites
- Node.js [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
- PostgreSQL/MySQL database [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
- npm [![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/) or yarn [![Yarn](https://img.shields.io/badge/Yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white)](https://yarnpkg.com/)

### Setup Instructions

1. First Setup & Start Auth Server  ([Repository](https://github.com/abhigyanpatek/auth-server
))

1. Clone the repository
```bash
git clone https://github.com/abhigyanpatek/ecommerce.git
cd ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in a `.env` file:
```bash
   DB_URI=<database-host> # Database connection URI
   DB_USER=<database-user> # Database user
   DB_PASSWORD=<database-password> # Set to empty string if no password
   DB_NAME=<database-name> # Database name
   DB_DIALECT=postgres # Set to mysql if using MySQL
   DB_SSL=true # Set to false if not using SSL
   HOST=localhost # Server host
   PORT=3000 # Server port
   ENV=dev
   AUTH_API_BASE_URL=http://localhost:3001 # Authentication service URL
```
4. Start the server: 
```bash 
   npm start
```


## 📚 API Documentation

### Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Register new user |
| POST | `/user/login` | User login |
| GET | `/user/logout` | User logout |

### Product APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/product/create` | Create product (Admin only) |
| POST | `/product/createMultipleProducts` | Bulk create products (Admin only) |
| GET | `/product/productsByName/:name` | Search products by name |
| GET | `/product/productById/:id` | Get product by ID |
| GET | `/product/productsByCategoryId/:categoryId` | Get products by category |
| GET | `/product/searchByKeyword` | Search products by keyword |

### Category APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/category/create` | Create category (Admin only) |
| GET | `/category/categories` | List all categories |
| GET | `/category/:categoryId` | Get category by ID |
| GET | `/category/categoryByName/:name` | Get category by name |

### Cart APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cart/create` | Create shopping cart |
| PUT | `/cart/update/:id` | Update cart items |
| DELETE | `/cart/delete/:id` | Remove items from cart |
| GET | `/cart/:id` | Get cart details |

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Token blacklisting
- Refresh token rotation
- Input validation middleware
- Error handling middleware



## Project Structure 📁

```
├── configs/         # Configuration files
├── constants/       # Constants and enums
├── controller/      # Request handlers
├── dao/             # Data access objects
│   ├── models/      # Database models
│   └── repository/  # Data repositories
├── middlewares/     # Express middlewares
├── routes/          # API routes
└── server.js        # Application entry
```

## License

This project is licensed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🤝 Contributing  
1. Fork the repo.  
2. Create a branch: git checkout -b feature/awesome-feature.  
3. Follow [coding standards](CONTRIBUTING.md).  
4. Submit a PR with a clear description.

## 📧 Contact  
For questions, email [abhigyanpatek@email.com](mailto:abhigyanpatek@email.com) or open an issue.

---
Made with ❤️ by Abhigyan Patek