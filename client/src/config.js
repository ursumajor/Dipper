// Base URL for the backend API. Set REACT_APP_API_URL in the deploy
// environment; falls back to the local dev server.
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
