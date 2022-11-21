import { MainPage } from './components/MainPage';
import { MovieDetails } from './components/MovieDetails';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './context'
import { useState, useEffect } from 'react';
import { MoviesByGenre } from './api';
import { Movies } from './api';
import { Authentication } from './api';

export function App() {
  const [genreId, setGenreId] = useState();  
  const [movies, setMovies] = useState('');
  const [movieType, setMovieType] = useState('popular');    
  const [page, setPage] = useState(1);

  function GenreId(genreId) {
    return (
      setGenreId(genreId)
    )
  }

  async function FetchMovies() {
    if (!genreId) {
    return (setMovies(await Movies(page, movieType)))
    } else { 
    return (setMovies(await MoviesByGenre(page, genreId)))
    }
  }


  
  async function FetchAuthentication() {
    let guestId = await Authentication();
    return (
        localStorage.setItem('guestId', guestId.guest_session_id )
    )
  }

  useEffect(() => { 
    !localStorage.getItem('guestId') && FetchAuthentication();
    FetchMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{
      GenreId
    }}>
      <Routes>
        <Route path='/' element={<MainPage 
          movies={movies} 
          movieType={setMovieType} 
          page={setPage}
          fetchMovies={FetchMovies()}
          genreId={genreId}
        />} />
        <Route path='MovieDetails/:id' element={<MovieDetails />} />
      </Routes>
    </Context.Provider>
  );
}