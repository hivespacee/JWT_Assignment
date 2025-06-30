# User-Specific To-Do List API

A secure backend API built using **Express** and **JWT authentication**, enabling:

- User registration and login  
- Personalized to-do list management  
- Secure password handling with `bcrypt`  
- Admin-exclusive access through role-based authorization  

> For simplicity, this version uses **in-memory storage**—no database required.

---

## Features

- **JWT Authentication** – Issues access tokens with a **1-hour expiry**
- **Protected Routes** – All `/api/todos` endpoints require a valid Bearer token
- **User-Specific To-Dos** – Users can access and modify only their own tasks
- **Role-Based Authorization** – Admins have elevated privileges to access all to-dos
- **Password Security** – Passwords are securely hashed using `bcrypt`

---

## Tech Stack

- Node.js  
- Express.js  
- bcrypt  
- jsonwebtoken  

---

## Screenshots

### Easy – Authentication & Protected Access

**User Registration**  
![register](https://github.com/user-attachments/assets/0182c657-0d76-4ce2-8f1b-93886cc3a9c9)

**User Login**  
![login](https://github.com/user-attachments/assets/de39d04a-9e21-4939-a5be-bddd6b98eef1)

**Accessing a Protected Route**  
![api-secret](https://github.com/user-attachments/assets/78a75f71-46e3-4b6b-a4e5-0aae7bfe4c87)

---

### Medium – To-Do Management & Role Authorization

**Add a New To-Do**  
![add-todo](https://github.com/user-attachments/assets/51cb6f17-df8d-4db3-9fff-2806eb60bc1f)

**Retrieve To-Dos**  
![get-todo](https://github.com/user-attachments/assets/af0905d7-8e2f-4468-ae77-e00d955adc34)

**Delete a To-Do**  
![delete-todo](https://github.com/user-attachments/assets/ba9fd91b-4e0c-4da8-8d90-9f7ce40ddfd4)

**Admin – Access All To-Dos**  
![admin-data](https://github.com/user-attachments/assets/97fc596b-57cc-4251-be74-2b73d476da47)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hivespacee/JWT_Assignment.git
cd week_03/secret-quote-api

git clone https://github.com/hivespacee/JWT_Assignment.git
cd week_03/secret-quote-api
 
2. Install Dependencies
 
npm install
 
3. Run the Server
 
npm start
 
API Endpoints
 
All /api routes require Authorization header:
Authorization: Bearer <accessToken>
 
Register a New User
POST /register
 
{
  "username": "Amaan",
  "password": "password"
}
(Optional admin user):
 
{
  "username": "Amaan",
  "password": "password",
  "role": "admin"
}
Login
POST /login
 
{
  "username": "Amaan Ahmed",
  "password": "password"
}
Response:
 
{
  "accessToken": "..."
}
 
Create a To-Do
 
POST /api/todos
{
  "task": "We need some space in hell"
}
📄 Get User’s To-Dos
GET /api/todos
 
Returns only the to-dos owned by the currently logged-in user.
 
Delete a To-Do
DELETE /api/todos/:id
 
Only allows deletion if the to-do belongs to the logged-in user.
 
Admin Only: View All To-Dos
GET /api/admin/all-todos
 
Only accessible to users with role: "admin"
 
How Access Control Works
When a user logs in, a JWT is issued containing: id, username, and role
 
Authentication middleware verifies the token and attaches data to req.user
 
/api/todos routes filter data based on req.user.id
 
Admin routes use authorizeAdmin middleware to allow only users with role: "admin"
 
Example Test Data for To-Dos
 
{ "task": "Learn JWT auth" }
{ "task": "Buy groceries" }
{ "task": "Read middleware documentation" }
{ "task": "Deploy app to Render" }
{ "task": "Review pull requests" }
Testing with Postman
Register a user (/register)
 
Log in to receive a token (/login)
 
Include this in headers for protected routes:
 
Authorization: Bearer your.jwt.token.here
Access and test endpoints like:
 
POST /api/todos
 
GET /api/todos
 
DELETE /api/todos/:id
 
GET /api/admin/all-todos (admin only)
