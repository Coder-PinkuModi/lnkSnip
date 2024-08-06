# lnkSnip

lnkSnip is a URL shortening service that allows users to create short, easy-to-share links. This project leverages the MERN stack (MongoDB, Express.js, Node.js) and includes user authentication with JWT.

## Features

- **URL Shortening**: Generate short URLs for easier sharing.
- **User Authentication**: Secure sign-up and login using JWT.
- **User-specific URLs**: Track URLs shortened by a specific user.

## Tech Stack

- **Frontend**: Ejs, Css, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Coder-PinkuModi/lnkSnip.git
   cd lnkSnip

   ```

2. npm install

3. Setup .env variables:
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development

4. Start server :
   npm start

## API Endpoints

GET /api: Access API routes.
GET /: Homepage, accessible only when authenticated.
GET /signup: Sign-up page.
GET /login: Login page.
GET /about: About page.
GET /logout: Logout and clear JWT token.
GET /:shortId :Redirect to the original URL.

## Deployment

Render: Deploy the application on Render for hosting.

## Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

## Contact

For any inquiries, please reach out to [Pinku Modi](mailto:pinku@example.com)


## Website
 Visit my website at [lnkSnip.onrender.com](https://lnkSnip.onrender.com) to explore the services. Please note that the website may take up to 50 seconds to start spinning due to being hosted on a free tier.