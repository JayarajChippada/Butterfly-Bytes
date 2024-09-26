# Butterfly Bytes

**Butterfly Bytes** is a full-featured blog application where admins can manage blog content and users can engage with posts by reading, commenting, and interacting. The platform allows for role-based access, where admins have complete control over content management, while regular users can read and contribute through comments.

## Features

- **Authentication**: Google OAuth for social login and JWT for secure session handling.
- **User Roles**: 
  - **Admin**: Can create, update, and delete blog posts, as well as manage users.
  - **User**: Can browse posts, update their profile, and leave comments on blog posts.
- **Dynamic Dashboards**:
  - **User Dashboard**: Allows users to manage their profile details and view posts.
  - **Admin Dashboard**: Allows admins to manage posts and user accounts.
- **Categorized Homepage**: Posts are categorized, and users can search and filter posts based on these categories for easy navigation.
- **Real-Time Engagement**: Users can engage with content via a comments section under each post.

## Tech Stack

### Frontend:
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend:
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Authentication:
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Deployment:
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Project Architecture

The project follows a clear separation of concerns with:
- **Frontend**: Built with functional components, utilizing React hooks for clean, maintainable code.
- **Backend**: Designed using Node.js and Express.js with MongoDB as the data store.
- **State Management**: Redux is used to manage global state, including theme preferences and user details.
- **Authentication**: Google OAuth for login, JWT for secure access token management.

## Running the Project Locally

1. **Clone the repository**:
    ```bash
    git clone git@github.com:YourUsername/butterfly-bytes.git
    ```

2. **Create `.env` files**:
    - In `butterfly-bytes/frontend/.env`, add:
      ```env
      REACT_APP_API_URL=http://localhost:9000
      REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
      ```

    - In `butterfly-bytes/backend/.env`, add:
      ```env
      MONGODB_URI=mongodb_url
      JWT_SECRET=random_secret_key
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      ```

3. **Install dependencies**:
    - Frontend:
      ```bash
      cd frontend
      npm install
      npm run dev
      ```

    - Backend:
      ```bash
      cd backend
      npm install
      npm run dev
      ```

4. The app should now be running:
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:9000`

## Contributing

We welcome contributions! If you find any issues or have improvements, feel free to:
- Fork the repository
- Create a new branch for your changes
- Submit a Pull Request with a detailed description of your changes

**Note**: Contribution guidelines will be added soon.
