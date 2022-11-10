import { MainPage } from './components/MainPage';
import { MovieDetails } from './components/MovieDetails';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Authentication } from './api';
import { useEffect } from 'react';

let guestSession
let guestSessionId

export function App() {

  async function fetchGuestSession() {
    guestSession = await Authentication();
    guestSessionId = await guestSession.guest_session_id
  }

  useEffect(() => {
    fetchGuestSession()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='MovieDetails/:id' element={<MovieDetails guestId={guestSessionId} />} />
      </Routes>
    </>
  );
}