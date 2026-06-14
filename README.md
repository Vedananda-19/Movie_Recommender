# Movie Recommender

A full-stack movie discovery and recommendation application that helps users explore movies, maintain personal watch collections, and receive recommendations based on their activity.

## Features

- Browse popular, top-rated, now-playing, and upcoming movies
- Register and log in with user authentication
- Like, watchlist, and mark movies as watched
- View personal movie collections
- Receive personalized movie recommendations
- Responsive and user-friendly interface
- Persistent database storage

## Tech Stack

### Frontend

- React
- TypeScript
- TanStack Query
- React Router
- Axios
- Vite

### Backend

- FastAPI
- SQLAlchemy
- REST API
- JWT authentication
- TMDB API integration

### Database

- PostgreSQL / SQLite

### Deployment

- GitHub Pages (Frontend)
- Render (Backend)

## Live Demo

Frontend: Movie Recommender

Backend API: `Render Link/docs`

## Project Structure

Movie_Recommender
│
├── backend
│   ├── routes
│   ├── services
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
└── frontend
    ├── public
    └── src
        ├── Components
        ├── Context
        ├── hooks
        ├── Layouts
        ├── Pages
        ├── Routes
        ├── apis
        ├── App.tsx
        └── main.tsx


## Screenshots & Code Snippets

### Movie Discovery Page

Displays popular, top-rated, now-playing, and upcoming movies using data retrieved from the TMDB API.

### Personalized Recommendations

Generates movie recommendations based on the user's liked, watched, and watchlisted movies.

### User Profile

Provides separate collections for liked, watched, and watchlisted movies.

### Authentication

Uses JWT authentication and protected routes to secure profile and recommendation features.

### FastAPI Backend

REST API endpoints handle authentication, user movie interactions, movie details, and personalized recommendations.

## What I Learned

- Building full-stack applications with React and FastAPI
- Implementing JWT authentication and protected routes
- Managing server state using TanStack Query
- Designing and consuming REST APIs
- Integrating an external movie API
- Managing relational data using SQLAlchemy
- Creating responsive and reusable UI components
- Building recommendations from user activity
- Deploying frontend and backend services independently

## Future Improvements

- Movie search and advanced filters
- More accurate recommendation algorithms
- Movie detail pages and trailers
- User ratings and reviews
- Pagination and infinite scrolling
- Social features and shared watchlists
- Improved account and profile management
- Dark/light theme toggle
