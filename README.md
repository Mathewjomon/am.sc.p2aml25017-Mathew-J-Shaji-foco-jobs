# 🚀 FOCO JOBS

### Hyperlocal Part-Time Job Platform for Kerala 🇮🇳

*"The Spark of a Single Shift, The Fire of Worker's Independence."*

<div align="center">

<img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge"/>
<img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Node.js-Backend-success?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge&logo=mongodb"/>
<img src="https://img.shields.io/badge/Kerala-Hyperlocal-orange?style=for-the-badge"/>

</div>

---

# 🌟 Overview

**Foco Jobs** is a full-stack MERN web application designed to connect part-time job seekers and employers across Kerala through a fast, secure, and location-aware hiring platform.

The platform provides:

* 📍 GPS-based nearby job discovery
* 🌐 Malayalam + English bilingual support
* 🔐 OTP-secured authentication
* 🧠 Skill-gap feedback system
* ⭐ Trust-based rating mechanism

---

# ✨ Core Features

## 📍 N1 — Geospatial Job Search

* MongoDB 2dsphere indexing
* Real GPS-based nearby job discovery
* `$near` geospatial queries
* Hyperlocal hiring experience

---

## 🌐 N2 — Malayalam Bilingual UI

* Built using `react-i18next`
* Instant language toggle
* English + Malayalam localization
* Kerala-focused accessibility

---

## 🧠 N3 — Skill-Gap Feedback

* TF-IDF keyword matching
* Match percentage scoring
* Missing skill suggestions
* Better hiring accuracy

---

## ⭐ N4 — Trust Rating System

* Employer ↔ Worker ratings
* 1–5 star review system
* Real-time rating updates
* Platform credibility system

---

## 🔐 N5 — OTP Verification

* 6-digit OTP email verification
* Gmail SMTP integration
* Blocks unverified accounts
* Secure onboarding process

---

# 🛠️ Tech Stack

| Frontend      | Backend    | Database           |
| ------------- | ---------- | ------------------ |
| React.js      | Node.js    | MongoDB            |
| React Router  | Express.js | Mongoose           |
| Axios         | JWT Auth   | 2dsphere Index     |
| Context API   | bcrypt.js  | Geospatial Queries |
| react-i18next | Nodemailer |                    |

---

# 📂 Project Structure

```bash
foco-jobs/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── mailer.js
│   └── server.js
│
└── client/
    └── src/
        ├── pages/
        ├── components/
        ├── context/
        ├── locales/
        └── App.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/foco-jobs.git
cd foco-jobs
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=mongodb://localhost:27017/partwork

JWT_SECRET=partwork_secret_key_2024

PORT=5000

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🎨 Frontend Setup

```bash
cd client
npm install --legacy-peer-deps
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🌍 Supported Cities

* 📍 Kochi
* 📍 Thiruvananthapuram
* 📍 Thrissur
* 📍 Kozhikode
* 📍 Kollam
* 📍 Kannur
* 📍 Palakkad

---

# 🔑 Authentication Features

* JWT Authentication
* Password Hashing
* OTP Verification
* Protected Routes
* Role-Based Access

---

# 💼 Employer Features

* Create Job Posts
* Manage Applications
* View Match Scores
* Rate Workers

---

# 👨‍💻 Job Seeker Features

* Browse Nearby Jobs
* Apply Instantly
* Skill Match Feedback
* Build Reputation Rating

---

# 📸 Screenshots


## 🏠 Home Page

<img width="1600" height="770" alt="image" src="https://github.com/user-attachments/assets/2247dfe6-979d-46a3-9c05-175efd332e8f" />


---

## 🔍 Job Listings

*Add screenshot here*

---

## 📊 Employer Dashboard

<img width="1362" height="850" alt="image" src="https://github.com/user-attachments/assets/1e475ebb-ff32-4c98-aacb-f77fa3f2dab8" />


## 👤 Worker Dashboard

<img width="1402" height="913" alt="image" src="https://github.com/user-attachments/assets/9bc0cb6f-0368-4eac-8a2d-bbd739dab8cd" />



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

# 🔮 Future Enhancements

* 📄 Resume Upload
* 🔔 Real-Time Notifications
* 🤖 AI Job Recommendations
* 💬 In-App Chat System
* 🛡️ Admin Dashboard
* 📱 Progressive Web App (PWA)
* 💳 Payment Integration

---

# 🤝 Contributing

```bash
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request
```

---

# 📄 License

Licensed under the MIT License.

---

<div align="center">

# ❤️ Built for Kerala's Gig Workforce

### Empowering local workers through technology.

</div>
