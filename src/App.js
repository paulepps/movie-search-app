import { MainPage } from './components/MainPage';
import { MovieDetails } from './components/MovieDetails';
import { NotFoundPage } from './components/NotFoundPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './context'
import { useState, useEffect } from 'react';
import { Movies } from './api';
import { Authentication } from './api';
import { Search } from './api';

export function App() {
  const [genreId, setGenreId] = useState();  
  const [movies, setMovies] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [movieSortByButton, setSortByButton] = useState('popularity'); 
  const [searchValue, setSearchValue] = useState(undefined);
  const [page, setPage] = useState(1);

  function GenreId(genreId) {
    return (
      setGenreId(genreId)
    )
  }

  function ToDefault() {
    return (
      setPage(1),
      setSortBy('popularity'),
      setGenreId(),
      setSortByButton('popularity')
    )
  }

  function FetchSearch(searchValue) {
    return (
      setPage(1),
      setSearchValue(searchValue)
    )
  }

  async function FetchMovies() {
    if (!!searchValue) {
      return (setMovies(await Search(page, searchValue)))
    } else {
      return (setMovies(await Movies(page, genreId, sortBy)))
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
      GenreId, ToDefault, FetchSearch
    }}>
      <Routes>
        <Route path='/' element={<MainPage 
          movies={movies} 
          sortBy={setSortBy} 
          page={setPage}
          fetchMovies={FetchMovies()}
          movieSortByButton={setSortByButton}
          movieSortBy={movieSortByButton}
          searchValue={searchValue}
        />} />
        <Route path='MovieDetails/:movieId' element={<MovieDetails />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Context.Provider>
  );
}