WedPlan — Wedding Planning Platform
A full-stack wedding planning platform where customers can discover wedding services and request bookings, vendors can publish and manage their services, and administrators can manage users, services, and platform transactions.

🌐 Live Website: https://wedplan-brown.vercel.app/
✨ Features
👤 Authentication & Authorization
- Sign up and sign in with email and password.
- Google authentication.
- Role-based access for Customers, Vendors, and Admins.
- Protected dashboard routes and server-side role verification.
- Profile management.
- Blocked-user access protection.
💍 Customer Features
- Browse approved and active wedding services.
- Search services by name.
- Filter services by category and location.
- View service details and vendor information.
- Submit booking requests with event date, location, and message.
- Track booking status.
- Cancel pending booking requests.
- View booking statistics from the customer dashboard.
🏪 Vendor Features
- Create and manage a vendor profile.
- Add, update, and delete wedding services.
- Upload service images.
- Track service approval status.
- Manage service availability.
- View, accept, or reject customer booking requests.
- View subscription plan information.
- Upgrade to Premium for unlimited active services.
🛡️ Admin Features
- View platform statistics.
- View, search, and manage registered users.
- Filter users by role.
- Block and unblock users.
- Review, approve, reject, and manage submitted services.
- View platform transactions.
💳 Subscription & Payments
- Stripe Checkout integration for Premium subscriptions.
- Payment success and cancel pages.
- Transaction records.
- Premium access is activated after verified payment events.
🎨 User Experience
- Responsive layout for desktop, tablet, and mobile.
- Wedding-themed interface.
- Loading and empty states.
- Toast notifications for success and error feedback.
- Smooth animations with Framer Motion.
🧰 Technology Stack
Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Better Auth
Backend
- Node.js
- Express.js
- MongoDB
- JWT authentication and role-based middleware
Services & Tools
- Stripe — subscription payments
- ImgBB — image hosting
- Vercel — frontend deployment
- GitHub — version control
📁 Project Structure
The project is maintained in separate client and server repositories.
WedPlan/
├── wedplan-client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
│
└── wedplan-server/
    ├── middleware/
    ├── routes/
    ├── index.js
    └── package.json
The folder names above describe the general client/server separation. Your actual folders may differ.

⚙️ Installation & Setup
Prerequisites
- Node.js 20 or later
- npm
- MongoDB database
- Stripe account (Test Mode for local testing)
- ImgBB API key
- Google OAuth credentials (if using Google sign-in)
1. Clone the repositories
# Clone the client repository
git clone YOUR_CLIENT_REPOSITORY_URL
cd YOUR_CLIENT_PROJECT_FOLDER
npm install
Open another terminal:
# Clone the server repository
git clone YOUR_SERVER_REPOSITORY_URL
cd YOUR_SERVER_PROJECT_FOLDER
npm install
2. Configure environment variables
Create a .env.local file in the client project and a .env file in the server project. Add the required values using the variable names expected by your application.

Client — .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Add the Better Auth and Google OAuth variables
# required by your client configuration.
Server — .env
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string
DB_NAME=WedPlan

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

IMGBB_API_KEY=your_imgbb_api_key
Environment variable names can differ depending on your source code. If your application uses different names, keep the names consistent with your actual configuration. Never commit .env or .env.local files or expose secret keys in client-side code.

3. Run the backend
npm run dev
Make sure the backend is running at the API URL configured in the client.
4. Run the frontend
In the client project terminal:
npm run dev
Open http://localhost:3000 in your browser.
🗄️ Database Collections
WedPlan uses MongoDB for application data. Better Auth manages its authentication-related collections.
Collection	Purpose
users	User profiles, roles, account status, and subscription information
services	Vendor services, images, pricing, location, and approval status
bookings	Customer booking requests and their statuses
transactions	Subscription payment and transaction records


🔐 Security
- Sensitive credentials are stored in environment variables.
- Protected API routes use JWT verification.
- Admin, Vendor, and Customer permissions are verified on the server.
- Resource ownership is checked before protected updates and deletions.
- Admin accounts are not created through public registration.
- Stripe payment events are verified on the server before Premium access is activated.
- Secret keys and database credentials must never be exposed in frontend code or committed to Git.
💎 Subscription Plans
Feature	Free Plan	Premium Plan
Active Services	Up to 3	Unlimited
Vendor Dashboard	✓	✓
Booking Request Management	✓	✓
Premium Vendor Badge	—	✓


🔗 Project Links
- Live Website: WedPlan
- Client Repository:[ Add Client GitHub Repository URL](https://github.com/mdwakil2009/wedplan)
- Server Repository: [Add Server GitHub Repository URL](https://github.com/mdwakil2009/wedplan-backend)
🧪 Payment Testing
Use Stripe Test Mode credentials when testing payments locally. Configure the Stripe webhook endpoint in your Stripe dashboard or local Stripe CLI so the backend can verify payment events.

Do not activate a Premium subscription only from the frontend success redirect.
📌 Notes
- Use your own environment variables before running the project.
- Keep client and server repositories separate.
- Do not upload credentials or .env files to GitHub.
- Test role permissions, booking flows, and payment verification before deployment.
👨‍💻 Author
WedPlan — Wedding Planning Platform

Built as a full-stack role-based wedding service and booking application.
