# Evenzo Frontend


## 🎉 Event Planner & Participation System

Evenzo is a comprehensive event management platform where users can create, manage, and participate in events with integrated payment processing via Shurjopay.

## 🚀 Live Demo

- Frontend: [Evenzo Frontend](https://evenzo.vercel.app)
- Backend API: [Evenzo Backend](https://event-planner-server-virid.vercel.app)


## 👨‍💻 Admin Access

For testing the admin functionality, use the following credentials:

```
Email: admin@mail.com
Password: admin1234
```
**Note:** This is a demo account. Please be mindful when testing the admin features.

## ✨ Features

- **User Authentication**
  - Secure JWT-based authentication
  - User registration and profile management

- **Event Management**
  - Create, edit, and delete events
  - Set events as Public or Private
  - Add optional registration fees
  - Manage participants (approve, reject, ban)

- **Event Discovery**
  - Browse upcoming events on homepage slider
  - Filter events by type (Free/Paid, Public/Private)
  - Search functionality by title and organizer

- **Participation System**
  - Join free public events instantly
  - Request access to private events
  - Integrated payment system for paid events
  - Member invitation system

- **Dashboard**
  - Manage your created events
  - View pending invitations
  - Handle reviews and ratings
  - Update account settings

## 🔧 Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Authentication:** JWT
- **Payment Gateway:** Shurjopay
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Backend API running

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/ayan-akd/event-planner-client.git
cd event-planner-client
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
bun install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL = <your-api-base-url>

NEXT_PUBLIC_UPLOAD_PRESET= <your-cloudinary-upload-preset>
NEXT_PUBLIC_CLOUD_NAME= <your-cloudinary-cloud-name>
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. **Build for production**

```bash
npm run build
# or
yarn build
# or
bun build
```

## 🌐 API Integration

The frontend communicates with the Evenzo backend API for all data operations. Ensure the backend server is running and accessible at the URL specified in your environment variables.

## 📱 Pages

- **Home**: Featured events slider and upcoming events
- **Events**: Browse and filter event listings
- **Event Details**: View event information and join/request access
- **Dashboard**: Manage events, invitations, reviews, and settings
- **Auth**: Login and registration pages

## 🔒 Authentication Flow

1. User registers or logs in
2. JWT token is stored in cookies
3. Protected routes check for valid token
4. Token is sent with API requests via Authorization header

## 💳 Payment Integration

Evenzo uses Shurjopay for handling event registration payments:

1. User selects a paid event
2. Frontend initiates payment request to backend
3. Backend generates payment link
4. User completes payment on Shurjopay portal
5. User is redirected back to frontend with payment status
6. Backend verifies payment and updates registration status

## 👥 User Roles

- **Regular User**: Can create events, join events, can review joined events, and manage their own content
- **Admin**: Has additional privileges to monitor all events and users. Can take action against inappropriate content.

## 🐞 Troubleshooting

- **API Connection Issues**: Verify that your backend server is running and the API URL is correctly set in your environment variables
- **Payment Gateway Errors**: Check Shurjopay credentials and connection settings


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Related Projects
- [Evenzo-backend](https://github.com/ayan-akd/event-planner-server): Backend repository.

## 👥 Collaborators
- [Ayan Kumar Das](https://github.com/ayan-akd)
- [Hammad Sadi](https://github.com/hammadsadi)
- [Md. Zakaria Hossain](https://github.com/Zakaria-24)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 📬 Contact

For any inquiries or issues, please contact us at support@evenzo.com
