<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# Product Management API

## Requirements

- Node.js (version 20 or higher)
- NestJS CLI (version 11.0.0 or higher)
- MongoDB (version 6.0 or higher)
- Docker (optional, for container deployment)

## Environment Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/api-product-management.git
   cd api-product-management
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/product-management
   JWT_SECRET=your-secret-key
   CLIENT_URL=http://localhost:4200
   ```

## Running Locally

1. Start MongoDB service

2. Run the application:
   ```sh
   # development mode
   npm run start

   # watch mode
   npm run start:dev

   # production mode
   npm run start:prod
   ```

3. The API will be available at `http://localhost:80/api/v1`

## Build

```sh
npm run build
```

## Deployment with Docker

1. Build the Docker image:
   ```sh
   docker build -t api-product-management .
   ```

2. Run the container:
   ```sh
   docker run -p 80:80 --env-file .env api-product-management
   ```

## Testing

```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/               # Authentication module
├── products/           # Products module
├── users/             # Users module
├── common/            # Shared resources
├── config/           # Configuration files
├── app.module.ts     # Main application module
└── main.ts          # Application entry point
```

## API Documentation

The API provides the following endpoints:

### Auth Routes
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/auth/profile - Get authenticated user profile

### User Routes
- POST /api/user/create - Create new user (Admin only)
- GET /api/user - Get all users (Admin only)
- GET /api/user/:id - Get user by ID (Admin and User)
- PUT /api/user/delete/:id - Soft delete user (Admin only)
- PUT /api/user/update/:id - Update user by ID (Admin only)
- PUT /api/user/update - Update own profile (Admin and User)

### Product Routes
- POST /api/product/create - Create new product (Admin only)
- GET /api/product - Get all products (Admin and User)
- GET /api/product/:id - Get product by ID (Admin and User)
- PUT /api/product/delete/:id - Soft delete product (Admin only)
- PUT /api/product/update/:id - Update product (Admin only)

### Invoice Routes
- POST /api/invoice/create - Create new invoice (User only)
- GET /api/invoice/:id - Get invoice by ID (Admin only)
- GET /api/invoice/user/:userId - Get user invoices (Admin and User)
- GET /api/invoice/user/:userId/purchases-last-month - Get user purchases last month (Admin only)
- GET /api/invoice/data/all-purchases-last-month - Get all purchases last month (Admin only)
- GET /api/invoice/data/count-all-invoices-last-month - Count all invoices last month (Admin only)
