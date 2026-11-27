# 💍 WedPlan — Wedding Planning Platform

<p align="center">
  **Plan Your Perfect Wedding, All in One Place.**
</p>

<p align="center">
  A modern, full-stack wedding planning platform that connects customers with trusted wedding service vendors.
</p>

<p align="center">
  🌐 **Live Website:** https://wedplan-brown.vercel.app/
</p>

---

## 📖 About The Project

**WedPlan** is a full-stack wedding planning platform designed to make wedding planning easier and more organized. It connects customers with wedding service providers through a single platform.

Customers can explore wedding services, search and filter providers, view service details, and submit booking requests. Vendors can create their profiles, publish and manage services, and handle customer booking requests. Vendors can also upgrade to a Premium subscription to unlock additional benefits.

The platform includes a dedicated Admin Dashboard where administrators can manage users, review services, and monitor transactions.

WedPlan provides a role-based experience for Customers, Vendors, and Admins with secure authentication and a responsive user interface.

## ✨ Key Features

### 👰 Customer Features
- Browse all available wedding services.
- Search and filter services by category and location.
- Sort services by price.
- View detailed service information.
- Submit wedding service booking requests.
- Track booking request status.
- Cancel pending booking requests.
- Manage personal profile.
- Access a personalized customer dashboard.

### 💼 Vendor Features
- Create and manage vendor profiles.
- Add new wedding services.
- Update and delete existing services.
- Manage service information and images.
- View customer booking requests.
- Accept or reject booking requests.
- Track service approval status.
- Manage subscription plans.
- Upgrade to Premium membership.
- Access a dedicated vendor dashboard.

### 🛡️ Admin Features
- Access the Admin Dashboard.
- View and manage registered users.
- Manage customers and vendors.
- Block or unblock user accounts.
- Review submitted wedding services.
- Approve or reject service requests.
- Manage published services.
- View platform transactions.
- Monitor platform activities.

### 💳 Subscription & Payment
- Integrated Stripe Checkout for secure payments.
- Free and Premium subscription plans.
- Premium subscription benefits for vendors.
- Payment transaction tracking.
- Premium access activation through verified Stripe webhook events.

### 🎨 UI/UX & Experience
- Fully responsive design for mobile, tablet, and desktop.
- Modern and professional user interface.
- Smooth animations and transitions.
- Reusable UI components.
- Loading states and error handling.
- User-friendly navigation and dashboards.

## 🛠️ Technology Stack

### Frontend
- **Next.js** – React framework for building the application.
- **React** – Component-based user interface.
- **TypeScript** – Type-safe development.
- **Tailwind CSS** – Utility-first styling.
- **Shadcn UI** – Reusable UI components.
- **Framer Motion** – Smooth animations.
- **Lucide React / React Icons** – Icons and visual elements.

### Backend
- **Node.js** – JavaScript runtime.
- **Express.js** – Backend API development.
- **MongoDB** – NoSQL database.
- **Better Auth** – Authentication and session management.
- **Jose** – JWT verification.

### Payment & Image Hosting
- **Stripe** – Payment processing and subscription management.
- **ImgBB** – Image hosting.

### Deployment & Tools
- **Vercel** – Frontend deployment.
- **Git & GitHub** – Version control and source code management.
- **Postman** – API testing.

## ⚙️ Installation & Setup

Follow these steps to run WedPlan locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- Git
- MongoDB account or MongoDB local server

### 1. Clone the Repositories

**Frontend:**

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
cd YOUR_CLIENT_PROJECT_FOLDER
```

**Backend:**

```bash
git clone YOUR_SERVER_REPOSITORY_URL
cd YOUR_SERVER_PROJECT_FOLDER
```

### 2. Install Dependencies

Run this command in both frontend and backend project directories:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend project and a `.env` file in the backend project.

Add the required environment variables according to your project configuration.

**Frontend `.env.local`:**

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL

BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=YOUR_FRONTEND_URL

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
```

**Backend `.env`:**

```env
PORT=8000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

CLIENT_URL=YOUR_FRONTEND_URL

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET
```

**Important:** These are environment variable examples. Use the exact variable names required by your actual frontend and backend configuration.

Never upload `.env` or `.env.local` files containing secret credentials to GitHub.

### 4. Run the Backend Server

Navigate to the backend project directory:

```bash
npm run dev
```

The backend API will run on:

```text
http://localhost:8000
```

### 5. Run the Frontend Application

Open another terminal and navigate to the frontend project directory:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔐 Security

WedPlan follows security practices to protect users and application data.

- Authentication is handled using Better Auth.
- Role-based access control is implemented for Customers, Vendors, and Admins.
- Protected backend APIs verify user authentication and authorization.
- Sensitive credentials are stored in environment variables.
- MongoDB credentials are kept private.
- Stripe payments are processed securely.
- Premium access is activated through verified webhook events.
- Unauthorized users cannot access restricted dashboard features.

## 📂 Project Structure

The application is organized into separate frontend and backend projects.

### Frontend

```text
client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── .env.local
├── package.json
└── README.md
```

### Backend

```text
server/
├── middleware/
├── routes/
├── index.js
├── .env
└── package.json
```

*Note: The structure above represents the main organization of the project.*

## 🌐 Live Website

**WedPlan:** https://wedplan-brown.vercel.app/

## 🔗 GitHub Repositories

- **Frontend Repository:** [Add Your Client GitHub Repository URL](https://github.com/mdwakil2009/wedplan)
- **Backend Repository:** [Add Your Server GitHub Repository URL](https://github.com/mdwakil2009/wedplan-backend)

## 🎯 Project Goal

The main goal of WedPlan is to simplify wedding planning by bringing customers and professional wedding service providers together on one platform.

It demonstrates practical implementation of full-stack development concepts, including authentication, role-based authorization, REST APIs, database management, payment integration, subscription handling, and responsive UI design.

---

<p align="center">
  **Made with ❤️ for making wedding planning easier.**
</p>

<p align="center">
  © 2026 WedPlan. All Rights Reserved.
</p>
