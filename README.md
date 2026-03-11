# SupportDesk – Ticket Management System

A full-stack ticket management system built to demonstrate backend architecture, API design, authentication, and relational database design.

The primary focus of this project is the **backend system**, including authentication, role-based access control, relational database design, and scalable API architecture.

A simple frontend was implemented only to **demonstrate and interact with the backend APIs**.

---

## Project Overview

SupportDesk is a simplified support ticket system similar to platforms like Jira or Zendesk.

Users can:

• Register and login  
• Create support tickets  
• View tickets  
• Comment on tickets  
• Update ticket status  
• Assign tickets to agents

The system demonstrates how a real-world backend handles authentication, authorization, and relational data.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Joi Validation
- Rate Limiting
- Logging Middleware

### Frontend

- React
- Vite
- Axios
- React Router

---

## Backend Architecture

The backend follows a modular architecture:

### Controllers

Contain business logic for handling API requests.

### Routes

Define API endpoints and map them to controllers.

### Middleware

Handle authentication, request limiting, and logging.

### Validation

Ensure incoming requests follow expected data structures.

### Config

Manage database connections and environment configuration.

---

## Database Design

The system uses PostgreSQL with relational tables:

### Users

Stores user information.

- id
- name
- email
- password
- role

### Tickets

- id
- title
- description
- priority
- status
- customer_id
- assigned_agent_id
- created_at

### Ticket Comments

- id
- title
- description
- priority
- status
- customer_id
- assigned_agent_id
- created_at

Relationships:

• One user → many tickets  
• One ticket → many comments  
• One agent → many assigned tickets

---

## Key Backend Features

### Authentication

Secure login system using JWT tokens.

### Role-Based Access Control

Different permissions for customers, agents, and admins.

### Ticket Workflow

OPEN → IN_PROGRESS → RESOLVED → CLOSED

### API Design

RESTful endpoints for ticket management.

### Pagination

Efficient ticket retrieval for large datasets.

### Input Validation

Request validation using Joi.

### Security

Rate limiting to prevent API abuse.

---

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login

### Tickets

GET /api/tickets
GET /api/tickets/:id
POST /api/tickets
PATCH /api/tickets/:id/status
PATCH /api/tickets/:id/assign

### Comments

POST /api/tickets/:ticketId/comments

---

## Frontend

The frontend is intentionally kept simple and minimal.

Its purpose is only to **demonstrate interaction with the backend APIs** and allow basic testing of the system.

Pages implemented:

• Login  
• Register  
• Dashboard (list tickets)  
• Create Ticket  
• Ticket Details

---

## Running the Project

### Backend

cd server
npm install
npm run dev

### Frontend

cd client
npm install
npm run dev

---

## Future Improvements

Possible improvements for production environments:

• Redis caching  
• Docker containerization  
• API documentation (Swagger)  
• WebSocket notifications  
• Advanced frontend UI

---

## Learning Goals

This project was built to practice:

• Backend system design  
• REST API architecture  
• Authentication and authorization  
• Relational database modeling  
• Full-stack integration
