# MedHub - Medical Management System

A microservices-based medical management application built with Node.js, TypeScript, and PostgreSQL.

## 🏥 Overview

MedHub is a healthcare management platform built with a microservices architecture. The system is designed to handle user authentication, administrative functions, and email communications for medical facilities.

## 🏗️ Architecture

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

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password recovery system
- Account verification
- Profile management

### 👥 User Management
- User profile creation and updates
- Account deletion
- Token refresh mechanism

### 📧 Communication
- Email service integration
- Notification system via RabbitMQ

### 🏢 Admin Management
- Administrative dashboard
- Facility management
- User oversight and control

## 🛠️ Installation & Setup

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

## 📋 API Documentation

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

## 📁 Project Structure

```
MedHub/
├── services/
│   ├── users/                     # Authentication & User Management
│   │   ├── src/
│   │   │   ├── controllers/       # Request handlers
│   │   │   ├── middlewares/       # Express middlewares
│   │   │   ├── routes/            # API routes
│   │   │   │   ├── v1/            # Version 1 routes
│   │   │   │   │   ├── signup-route.ts
│   │   │   │   │   ├── login-route.ts
│   │   │   │   │   ├── logout-route.ts
│   │   │   │   │   ├── get-me-route.ts
│   │   │   │   │   ├── refresh-token-route.ts
│   │   │   │   │   ├── verify-account-route.ts
│   │   │   │   │   ├── forgot-password-route.ts
│   │   │   │   │   ├── verify-forgot-password-code-route.ts
│   │   │   │   │   ├── change-password-route.ts
│   │   │   │   │   ├── delete-account.ts
│   │   │   │   │   ├── update-profile-route.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/          # Business logic
│   │   │   ├── utils/             # Utility functions
│   │   │   ├── repo/              # Repository layer
│   │   │   ├── schema/            # Validation schemas
│   │   │   ├── generated/         # Generated files
│   │   │   ├── prisma.ts          # Prisma client
│   │   │   └── index.ts           # Service entry point
│   │   ├── prisma/                # Database schema & migrations
│   │   │   ├── schema.prisma      # Database schema
│   │   │   └── migrations/        # Database migrations
│   │   ├── package.json           # Dependencies
│   │   ├── tsconfig.json          # TypeScript config
│   │   └── .gitignore
│   ├── admin/                     # Administrative Functions
│   │   ├── src/
│   │   │   ├── controllers/       # Admin request handlers
│   │   │   ├── middlewares/       # Admin middlewares
│   │   │   ├── routes/            # Admin API routes
│   │   │   │   ├── v1/            # Version 1 admin routes
│   │   │   │   │   ├── create-doctor-route.ts
│   │   │   │   │   ├── create-appointment-route.ts
│   │   │   │   │   ├── book-appointment-route.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/          # Admin business logic
│   │   │   ├── utils/             # Admin utilities
│   │   │   ├── repo/              # Admin repository layer
│   │   │   ├── schema/            # Admin validation schemas
│   │   │   ├── generated/         # Generated admin files
│   │   │   ├── prisma.ts          # Admin Prisma client
│   │   │   └── index.ts           # Admin service entry point
│   │   ├── prisma/                # Admin database schema
│   │   │   ├── schema.prisma      # Admin database schema
│   │   │   └── migrations/        # Admin migrations
│   │   ├── package.json           # Admin dependencies
│   │   ├── tsconfig.json          # Admin TypeScript config
│   │   └── .gitignore
│   └── email/                     # Email Communication
│       ├── src/
│       │   ├── controllers/       # Email request handlers
│       │   ├── middlewares/       # Email middlewares
│       │   ├── routes/            # Email API routes
│       │   │   ├── v1/            # Version 1 email routes
│       │   │   └── index.ts
│       │   ├── services/          # Email business logic
│       │   ├── utils/             # Email utilities
│       │   ├── repo/              # Email repository layer
│       │   ├── schema/            # Email validation schemas
│       │   ├── generated/         # Generated email files
│       │   ├── prisma.ts          # Email Prisma client
│       │   └── index.ts           # Email service entry point
│       ├── prisma/                # Email database schema
│       │   ├── schema.prisma      # Email database schema
│       │   └── migrations/        # Email migrations
│       ├── tests/                 # Email service tests
│       ├── package.json           # Email dependencies
│       ├── tsconfig.json          # Email TypeScript config
│       └── .gitignore
├── README.md                      # This file
└── .gitignore                     # Git ignore rules
```

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammad Arkan**

## 🚧 Development Status

### ✅ Completed
- [x] Microservices architecture setup
- [x] User authentication system
- [x] Database schema with Prisma
- [x] Email service integration
- [x] RabbitMQ message queue setup
- [x] Basic API endpoints for user management
- [x] Admin service structure
- [x] Email service structure

## 📋 Future Services

### Admin Service Features
- User management and oversight
- Facility administration
- System configuration
- Role and permission management
- Administrative dashboard
- Facility analytics and reporting

### Email Service Features
- Account verification emails
- Password reset notifications
- Appointment confirmations
- Reminder notifications
- System announcements
- Custom email templates

## ⚠️ Project Status

**This project is now complete and no further contributions will be accepted.**

The MedHub medical management system has been fully implemented with all core features and services. The microservices architecture is complete with user authentication, administrative functions, and email communication systems. All planned features have been delivered and the project is considered finished.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact with me via this email => mdarkanurl@gmail.com
- Check the code and try to resolve the problem you face or email me

---

**MedHub** - Building the future of healthcare management.

