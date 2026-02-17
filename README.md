# Vighnaharta Infinity - Premium Real Estate Web Application

A high-performance, pixel-perfect real estate platform designed for excellence. This project features a fully dynamic Content Management System (CMS), lead generation, and a cinematic UI/UX.

## 🚀 Live Demo

- **Frontend**: [https://vighnaharta-infinity.vercel.app](https://vighnaharta-infinity.vercel.app)
- **Backend**: [https://vighnaharta-infinity-42xi.onrender.com](https://vighnaharta-infinity-42xi.onrender.com)

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas Cluster)
- **Authentication**: JWT & Cookie-based credential login
- **Media**: Cloudinary for dynamic image management

## ✨ Key Features

- **Pixel-Perfect UI**: Precisely matched sections for Hero, About, Amenities, Township, and FAQ based on reference designs.
- **Dynamic CMS**: Admin dashboard to manage all text, images, and video links across the homepage in real-time.
- **Cinematic Video Tour**: Full-width drone vision section with a modal video player.
- **Lead Generation**: Integrated enquiry forms that capture user data and store them in the backend.
- **Smooth Navigation**: Custom offset-aware smooth scrolling for a premium feel.
- **Cloud Media**: Direct image uploads to Cloudinary from the admin panel.

## 🔑 Admin Credentials

- **URL**: `https://vighnaharta-infinity.vercel.app/admin`
- **Email**: `admin@gmail.com`
- **Password**: `1234`

## ⚙️ Local Setup

### Prerequisites

- Node.js (v18+)
- MongoDB connection string

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Seed the database:

```bash
node seed.js
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5001/api
```

Run the application:

```bash
npm run dev
```

---

