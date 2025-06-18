# AI Feedback Response with Authentication System (Email Verification, Reset Password working concept)

AI-generated feedback responses are created when a customer fills out the feedback form, but only after the user has authenticated or created an account.

#### File/Folder Structure

- [x] FRONTEND (Vite + React + TailwindCSS)
- [x] BACKEND (Node.js + Express + MongoDB + JWT)

```bash
AI-Feedback-Response-with-Auth/
│
├── backend/                        # Node.js + Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   ├── feedback.controller.js
│   │   └── user.controller.js      # Register, login, reset, etc.
│   │
│   ├── middlewares/
│   │   ├── adminAuth.middleware.js
│   │   ├── isAdmin.middleware.js
│   │   └── userauth.middleware.js      # JWT verification
│   │
│   ├── models/
│   │   ├── Feedback.model.js
│   │   └── User.model.js           # Mongoose schema
│   │
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── feedback.routes.js
│   │   └── user.routes.js          # All auth routes
│   │
│   ├── utils/
│   │   ├── apicall.js
│   │   ├── emailTemplates.js       # HTML templates for email
│   │   ├── mongodb.js
│   │   └── nodemailer.js           # Nodemailer transporter config
│   │
│   ├── .env                        # Environment variables
│   ├── index.js                    # Entry point (Express server)
│   ├── package.json
│   └── README.md
│
├── frontend/                       # React + Vite + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/             # Reusable components (inputs, buttons, etc.)
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── contexts/               # Axios API calls
│   │   │   └── AppContext.jsx
│   │   │
│   │   ├── pages/                  # Register, Login, ForgotPassword, etc.
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── ThankYou.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.css
│   ├── vite.config.js              # Set up proxy to backend
│   ├── .env                        # VITE_ prefixed keys
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                       # Root README
```

<br>

#### Deployment Process

- 1] Check port added in **backend/index.js**
  ```js
  const port = process.env.PORT || 4000;
  ```

- 2] Deploy backend
  - Web Services -> New Web Service -> Build and deploy from a Git repo
  - Root Directory - backend
  - Build cmd - `npm install`
  - Start cmd - `node index.js`
  - Add Env. variables of backend

- 3] Copy backend url after live that.
  - Replace localhost url with render live link in --> frontend/.env

  ```bash
  https://ai-feedback-response-with-auth-backend.onrender.com
  ```

- 4] Update code in backend/utils/`mongodb.js`
  ```js
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  dotenv.config();

  const db = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("MongoDB Connection Error:", error.message);
      process.exit(1);
    }
  };

  export default db;
  ```

  - Update code in backend/`index.js`
  ```js
  const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-feedback-response-with-auth-frontend.onrender.com",
  ];
  ```

- 5] MongoDB Atlas IP Whitelist
  - Network Access -> Add IP Address -> `0.0.0.0/0`

- 6] Deploy frontend
  - Web Services -> Static Site -> Build and deploy from a git repo
  - Root Directory - frontend
  - Build cmd - `npm install; npm run build`
  - Publish Directory - `./dist`
  - Add Env. variables of frontend

- 7] Add Redirects/Rewrites in frontend
  - frontend
    - Source => `/*`
    - Destination => `/index.html`
    - Action => `Rewrite`

- 8] Update code in backend/`auth.controller.js`
  ```js
  // set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  ```
