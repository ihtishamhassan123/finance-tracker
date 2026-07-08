# 💰 Finance Tracker

A full-stack Finance Tracker web application built with the MERN ecosystem and PostgreSQL. Users can securely manage their income and expenses, visualize financial data with charts, and manage their account through authentication and profile features.

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### User Profile
- View Profile
- Update Profile
- Upload Profile Image
- Change Password

### Password Recovery
- Forgot Password
- Reset Password using Email Token
- Secure Expiring Reset Token

### Transactions
- Add Transaction
- Update Transaction
- Delete Transaction
- View All Transactions

### Dashboard
- Total Income
- Total Expense
- Current Balance
- Monthly Income vs Expense Line Chart
- Expense Category Pie Chart

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Chakra UI
- Axios
- Context API
- Recharts

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg
- JWT
- bcrypt
- Multer
- Nodemailer

## 📊 Database

- PostgreSQL
- Parameterized SQL Queries
- Aggregate Functions
- GROUP BY
- CASE Statements

## 🔐 Security

- Password Hashing using bcrypt
- JWT Authentication
- Protected API Routes
- SQL Injection Prevention using Parameterized Queries
- Secure Password Reset Token
- Environment Variables for Sensitive Data

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/Ihtishamhassan123/finance-tracker.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=
DATABASE=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

JWT_SECRET=

USER_EMAIL=
USER_PASS=
```

## 📷 Screenshots

_Add your dashboard screenshots here._

## Future Improvements

- Dark Mode
- Export Reports (PDF/Excel)
- Budget Planning
- Recurring Transactions
- Monthly Reports
- Notifications

## 👨‍💻 Author

**Ihtisham Hassan**

GitHub:
https://github.com/Ihtishamhassan123
