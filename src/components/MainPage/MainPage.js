import { Header } from '../../components/Header';
//import { ElementPage } from '../../components/ElementPage';
import { MovieCard } from '../../components/MovieCard';
import styles from './MainPage.module.scss';
import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { useState } from 'react';
//import { Link } from 'react-router-dom';


export function MainPage({movies, movieType, page, genreId}) {     
    const [movieTypeButton, setMovieTypeButton] = useState('popular');   
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

    return (           
        <>
            {!!moviesData &&
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header />
                </div>
                {!genreId &&
                <div className={styles.button}>
                    <button className={`${movieTypeButton === 'top_rated' && styles.chosen}`} onClick={() => {movieType('top_rated'); page(1); setMovieTypeButton('top_rated'); console.log(genreId) }} > Top rated </button>
                    <button className={`${movieTypeButton === 'popular' && styles.chosen}`} onClick={() => {movieType('popular'); page(1); setMovieTypeButton('popular')}} > Popular </button>
                </div>}
                <div className={styles.MovieCard} >                
                    <MovieCard moviesData={moviesData} />
                </div>
                <div className={styles.pages}>
                    {movies.page > 1 && <GrFormPrevious className={styles.GrFormPrevious} onClick={() =>  {window.scrollTo(0, 0); page(movies.page - 1)}} />}
                    <div className={styles.pagesContainer}>
                        {movies.page > 5 &&
                            <>
                                <div className={`${movies.page === 1 && styles.active}`} onClick={() =>  { window.scrollTo(0, 0); page(1)}}> 1 </div>
                                ...
                            </>
                        }
                        { pages.map((pages) => ( 
                        <div className={`${pages.page === movies.page && styles.active}`} key={pages.page} onClick={() =>  { page(pages.page)}} >  
                            {pages.page}
                        </div>
                        ))}
                        {movies.page < 496 &&
                            <>
                                ...
                                <div className={`${movies.page === 500 && styles.active}`} onClick={() =>  { window.scrollTo(0, 0); page(500)}}> 500 </div>
                            </>
                        }
                    </div>
                    {movies.page < 500 && <GrFormNext className={styles.GrFormNext} onClick={() =>  { window.scrollTo(0, 0); page(movies.page + 1)}} />}
                </div> 
            </div>}
        </>
    )
}