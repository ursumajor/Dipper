import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import Feed from './pages/Feed';
import FollowingFeed from './pages/FollowingFeed';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipe from './pages/NewRecipe';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Cookbooks from './pages/Cookbooks';
import CookbookDetail from './pages/CookbookDetail';
import OnboardingGate from './components/onboarding-gate';


function App() {
  const {isAuthenticated} = useAuth0(); 

  return (<BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3 mb-4">
      <Link className="navbar-brand fw-bold" to="/recipes">🍴 Cookbook</Link>
      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/recipes">Recipes</Link>
        <Link className="nav-link" to="/recipes/new">New Recipe</Link>
      </div>
      <div className="navbar-nav">
        {!isAuthenticated && (
          <Link className="nav-link" to="/login">Login</Link>
        )}
        {isAuthenticated && (
          <Link className="nav-link" to="/profile">Profile</Link>
        )}
      </div>
    </nav>

    <OnboardingGate>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<Feed/>} />
        <Route path="/following" element={<FollowingFeed/>} />
        <Route path="/recipes/new" element={<NewRecipe/>} />
        <Route path="/recipes/:id" element={<RecipeDetail/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:username" element={<UserProfile/>} />
        <Route path="/cookbooks" element={<Cookbooks/>} />
        <Route path="/cookbooks/:id" element={<CookbookDetail/>} />
      </Routes>
    </OnboardingGate>
  </BrowserRouter>)
}
export default App;
