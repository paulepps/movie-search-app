import { Header } from '../../components/Header';
//import { ElementPage } from '../../components/ElementPage';
import { MovieCard } from '../../components/MovieCard';
import styles from './MainPage.module.scss';
import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { Movies } from '../../api';
//import { Link } from 'react-router-dom';


export function MainPage() {
    const [movies, setMovies] = useState('');
    const [movieType, setMovieType] = useState('popular');
    const [movieTypeButton, setMovieTypeButton] = useState('popular');
    const [page, setPage] = useState(1);
    const moviesData = movies.results;
  
    const pages = [
        {page: movies.page <= 5 ? 1 : movies.page >= 496 ? 492 : movies.page - 4},
        {page: movies.page <= 5 ? 2 : movies.page >= 496 ? 493 : movies.page - 3},
        {page: movies.page <= 5 ? 3 : movies.page >= 496 ? 494 : movies.page - 2},
        {page: movies.page <= 5 ? 4 : movies.page >= 496 ? 495 : movies.page - 1},
        {page: movies.page <= 5 ? 5 : movies.page >= 496 ? 496 : movies.page},
        {page: movies.page <= 5 ? 6 : movies.page >= 496 ? 497 : movies.page + 1},
        {page: movies.page <= 5 ? 7 : movies.page >= 496 ? 498 : movies.page + 2},
        {page: movies.page <= 5 ? 8 : movies.page >= 496 ? 499 : movies.page + 3},
        {page: movies.page <= 5 ? 9 : movies.page >= 496 ? 500 : movies.page + 4},
    ];

    
    async function fetchMovies() {
        return (
            setMovies(await Movies(page, movieType))
        )
    }

    useEffect(() => {
        fetchMovies()   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (           
        <>
            {moviesData !== undefined &&
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header/>
                </div>
                <div className={styles.button}>
                    <button className={`${movieTypeButton === 'top_rated' && styles.chosen}`} onMouseLeave={() => movieTypeButton !== 'top_rated' && setMovieType(movieTypeButton) } onMouseEnter={() => {setMovieType('top_rated'); setPage(1)}} onClick={() => {fetchMovies(); setMovieTypeButton('top_rated')}}> Top rated </button>
                    <button className={`${movieTypeButton === 'popular' && styles.chosen}`} onMouseLeave={() => movieTypeButton !== 'popular' && setMovieType(movieTypeButton) } onMouseEnter={() => {setMovieType('popular'); setPage(1)}} onClick={() => {fetchMovies(); setMovieTypeButton('popular')}} > Popular </button>
                </div>
                <div className={styles.MovieCard} >                
                    <MovieCard moviesData={moviesData} />
                </div>
                <div className={styles.pages}>
                    {movies.page > 1 && <GrFormPrevious className={styles.GrFormPrevious} onClick={() =>  {fetchMovies(); window.scrollTo(0, 0)}} onMouseEnter={() => setPage(movies.page - 1)} />}
                    <div className={styles.pagesContainer}>
                        {movies.page > 5 &&
                            <>
                                <div className={`${movies.page === 1 && styles.active}`} onMouseEnter={() => setPage(1)} onClick={() =>  {fetchMovies(); window.scrollTo(0, 0)}}> 1 </div>
                                ...
                            </>
                        }
                        { pages.map((pages) => ( 
                        <div className={`${pages.page === movies.page && styles.active}`} key={pages.page} onMouseEnter={() => setPage(pages.page)} onClick={() =>  {fetchMovies(); window.scrollTo(0, 0)}} >  
                            {pages.page}
                        </div>
                        ))}
                        {movies.page < 496 &&
                            <>
                                ...
                                <div className={`${movies.page === 500 && styles.active}`} onMouseEnter={() => setPage(500)} onClick={() =>  {fetchMovies(); window.scrollTo(0, 0)}}> 500 </div>
                            </>
                        }
                    </div>
                    {movies.page < 500 && <GrFormNext className={styles.GrFormNext} onClick={() =>  {fetchMovies(); window.scrollTo(0, 0)}} onMouseEnter={() => setPage(movies.page + 1)}/>}
                </div> 
            </div>}
        </>
    )
}