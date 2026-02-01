# MedHub - Medical Management System

A microservices-based medical management application built with Node.js, TypeScript, and PostgreSQL.

## Overview

MedHub is a healthcare management platform built with a microservices architecture. The system is designed to handle user authentication, administrative functions, and email communications for medical facilities.

## Architecture

MedHub follows a **microservices architecture** with three main services:

- **Users Service** - Authentication and user management
- **Admin Service** - Administrative functions and facility management
- **Email Service** - Communication and notification system

### Technology Stack

- **Backend**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Message Queue**: RabbitMQ for inter-service communication
- **Authentication**: JWT tokens
- **Email**: Resend for email notifications
- **Validation**: Zod for schema validation

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password recovery system
- Account verification
- Profile management

### User Management
- User profile creation and updates
- Account deletion
- Token refresh mechanism

### Communication
- Email service integration
- Notification system via RabbitMQ

### Admin Management
- Administrative dashboard
- Facility management
- User oversight and control

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- RabbitMQ server
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MedHub
```

### 2. Environment Setup
Create `.env` files for each service:

#### Users Service (`services/users/.env`)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/medhub_users"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
RABBITMQ_URL="amqp://localhost:5672"
```

#### Admin Service (`services/admin/.env`)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/medhub_admin"
RABBITMQ_URL="amqp://localhost:5672"
```

#### Email Service (`services/email/.env`)
```env
RABBITMQ_URL="amqp://localhost:5672"
RESEND_API_KEY="your-resend-api-key"
```

### 3. Install Dependencies
```bash
# Install dependencies for all services
cd services/users && npm install
cd ../admin && npm install
cd ../email && npm install
```

### 4. Database Setup
```bash
# Run migrations for each service
cd services/users && npm run migrate:dev
cd ../admin && npm run migrate:dev
cd ../email && npm run migrate:dev
```

### 5. Start Services
```bash
# Start all services in separate terminals

# Terminal 1 - Users Service
cd services/users && npm run dev

# Terminal 2 - Admin Service
cd services/admin && npm run dev

# Terminal 3 - Email Service
cd services/email && npm run dev
```

## API Documentation

### Users Service

#### Authentication Endpoints
```http
POST /api/signup                    # User registration
POST /api/login                     # User login
GET  /api/logout                    # User logout
GET  /api/get-me                    # Get current user
POST /api/refresh-token             # Refresh access token
POST /api/verify-account            # Verify account
POST /api/forgot-password           # Password recovery
POST /api/reset-password            # Verify password reset code
PUT  /api/change-password           # Change password
POST /api/delete-account            # Delete account
PUT  /api/update-profile            # Update profile
```

### Admin Service

#### Doctor Management
```http
POST /api/doctors                   # Create new doctor profile
```

#### Appointment Management
```http
POST /api/appointments              # Create new appointment slot
POST /api/book-appointments         # Book appointment for patient
```

### Email Service
```http
# Email service endpoints for notifications
# Account verification emails
# Password reset notifications
# Appointment reminders
# (Implementation in progress)
```

## 🔄 Service Communication

### RabbitMQ Integration
Services communicate through RabbitMQ message queue for:
- Email notifications
- Inter-service messaging
- Event-driven architecture

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Mohammad Arkan**

