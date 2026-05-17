# FOCO JOBS

A full-stack job portal built for connecting part-time job seekers and employers in Kerala.
This platform allows employers to post jobs and manage applications, while job seekers can browse and apply for opportunities.

---

## 🚀 Features

### 👤 Authentication

* User registration & login
* JWT-based authentication
* OTP verification
* Role-based access:

  * Job Seeker
  * Employer

### 💼 Job Management

* Employers can post jobs
* View and manage applications
* Dedicated employer dashboard

### 🔍 Job Search

* Browse available jobs
* View detailed job information
* Apply directly through the platform

### 📊 Dashboards

* Seeker Dashboard
* Employer Dashboard

### 🌐 Internationalization

* Multi-language support using i18next

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* i18next

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer

---

# 📂 Project Structure

```bash
partwork-kerala/
│
├── client/        # React frontend
├── server/        # Express backend
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/partwork-kerala.git
cd partwork-kerala
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend server:

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔐 API Features

## Authentication Routes

* Register user
* Login user
* OTP verification

## Job Routes

* Create jobs
* Fetch jobs
* Apply for jobs

## Application Routes

* Manage applications
* Employer application tracking

---

# 📸 Screens Included

* Home Page
* Login/Register
* Job Listings
* Job Details
* Employer Dashboard
* Seeker Dashboard

---

# 🧪 Available Scripts

## Client

```bash
npm start
npm run build
npm test
```

## Server

```bash
npm start
npm run dev
```

---

# 📌 Future Improvements

* Resume upload
* Real-time notifications
* Advanced job filtering
* Payment integration
* Admin panel
* Chat system between employers & seekers

---

# 🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first to discuss what you would like to change.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with ❤️ for Kerala job seekers and employers.
