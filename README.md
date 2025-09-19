# 🔐 Next.js Full-Stack Authentication App

A **full-stack authentication system** built with **Next.js (TypeScript)** that allows users to **sign up, log in, verify their email, and reset their password** securely.  
This app uses **MongoDB**, **JWT**, and **Nodemailer** for backend functionality and **Tailwind CSS** for a clean, modern UI.

---

## 🚀 Features

✅ **User Registration & Login** – Secure authentication using **bcryptjs** for password hashing.  
✅ **Email Verification** – Sends a verification email to confirm the user’s account.  
✅ **Password Reset** – Users can request a password reset via email.  
✅ **JWT Authentication** – JSON Web Tokens for session handling.  
✅ **Responsive UI** – Styled with **Tailwind CSS** for mobile-first design.  
✅ **Full TypeScript Support** – Type-safe development for both client and server.  
✅ **MongoDB Database** – Stores users, tokens, and authentication data.

---

## 🛠️ Tech Stack

| Technology       | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| **Next.js**      | Full-stack React framework (API routes + frontend) |
| **TypeScript**   | Type-safe development                              |
| **MongoDB**      | Database for storing user details                  |
| **Mongoose**     | MongoDB object modeling                            |
| **Nodemailer**   | Sending verification & reset emails                |
| **bcryptjs**     | Password hashing                                   |
| **jsonwebtoken** | Secure token generation                            |
| **Tailwind CSS** | Modern, responsive styling                         |
| **Axios**        | API requests                                       |

---

## 📂 Project Structure

```
nextjs-auth-app/
│
├─ 📁 src/
├─ 📁 app/                      # Next.js 15 app directory
│   ├─ 📁 api/users/             # API routes for user authentication
│   │   ├─ 📁 [id]/              # Dynamic user API
│   │   ├─ 📁 forgotpassword/    # API for password reset request
│   │   ├─ 📁 info/              # User info API
│   │   ├─ 📁 login/             # Login API
│   │   ├─ 📁 logout/            # Logout API
│   │   ├─ 📁 resetpassword/     # API to reset password
│   │   ├─ 📁 signup/            # Sign up API
│   │   └─ 📁 verifyemail/       # Email verification API
│   │
│   ├─ 📁 forgotpassword/        # Forgot password page
│   ├─ 📁 login/                 # Login page
│   ├─ 📁 profile/               # User profile page
│   ├─ 📁 resetpassword/         # Reset password page
│   ├─ 📁 signup/                # Sign up page
│   └─ 📁 verifyemail/           # Verify email page
│
├─ 📁 dbConfig/                  # MongoDB connection setup
├─ 📁 helpers/                   # Utility/helper functions (email, JWT, etc.)
├─ 📁 models/                    # Mongoose models (User schema)
├─ middleware.ts                 # Next.js middleware (auth checks)
├─ globals.css                   # Tailwind global styles
├─ layout.tsx                     # Root layout
└─ page.tsx                       # Home page
```

### 🌐 Live Demo

[Nextjs Auth App](https://nextjs-auth-app-umber.vercel.app/login)

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/smttomar/nextjs-auth-app.git
cd nextjs-auth-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

Your app will be live at http://localhost:3000

---

## ⚡ Dependencies

```json
"dependencies": {
  "axios": "^1.11.0",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.18.1",
  "next": "15.5.3",
  "nodemailer": "^7.0.6",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "react-hot-toast": "^2.6.0"
}
```

---

## 🔑 Environment Variables

Create a .env file in the root of your project:

```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
DOMAIN=https://your-deployed-domain.vercel.app
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_app_password
```

---

## 🚀 Deployment on Vercel

1. Push the project to **GitHub**.

2. Go to [Vercel](https://vercel.com/)
   → **Create New Project** → Import your GitHub repository.

3. Add the environment variables listed above in
   **Project → Settings → Environment Variables**.

4. Click **Deploy** and let Vercel build your Next.js app.

---

## ✉️ Email Workflow

-   **Sign Up** → User receives a verification email.

-   **Email Verification** → Clicking the link verifies the user.

-   **Forgot Password** → User receives a password reset link.

Emails are sent using **Nodemailer** with **Gmail SMTP**.

---

## 🔒 Security

-   Passwords are **hashed with bcrypt** before saving.

-   Tokens are **signed using JWT** to prevent tampering.

-   Environment variables hide sensitive credentials.

---

## 🤝 Contributing

1. Fork the repository

2. Create a new branch (feature/your-feature)

3. Commit your changes

4. Push to the branch and open a PR

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it.

---

## 💡 Author

-   👤 Chandra Pratap Singh
-   💻 [GitHub](https://github.com/smttomar "smttomar") | ✉️ sumitsnghtmr@gmail.com

---
