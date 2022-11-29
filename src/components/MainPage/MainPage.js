import { Header } from '../../components/Header';
import { MovieCard } from '../../components/MovieCard';
import styles from './MainPage.module.scss';
import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';


export function MainPage({movies, sortBy, page, movieSortByButton, movieSortBy, searchValue}) {       
    const moviesData = movies.results;
    const lastPage = movies.total_pages >= 500 ? 500 : movies.total_pages <= 9 ? 9 : movies.total_pages;

    const pages = [
        {page: movies.page <= 5 ? 1 : movies.page >= lastPage-4 ? lastPage-8 : movies.page - 4, maxPage: lastPage},
        {page: movies.page <= 5 ? 2 : movies.page >= lastPage-4 ? lastPage-7 : movies.page - 3, maxPage: lastPage},
        {page: movies.page <= 5 ? 3 : movies.page >= lastPage-4 ? lastPage-6 : movies.page - 2, maxPage: lastPage},
        {page: movies.page <= 5 ? 4 : movies.page >= lastPage-4 ? lastPage-5 : movies.page - 1, maxPage: lastPage},
        {page: movies.page <= 5 ? 5 : movies.page >= lastPage-4 ? lastPage-4 : movies.page, maxPage: lastPage},
        {page: movies.page <= 5 ? 6 : movies.page >= lastPage-4 ? lastPage-3 : movies.page + 1, maxPage: lastPage},
        {page: movies.page <= 5 ? 7 : movies.page >= lastPage-4 ? lastPage-2 : movies.page + 2, maxPage: lastPage},
        {page: movies.page <= 5 ? 8 : movies.page >= lastPage-4 ? lastPage-1 : movies.page + 3, maxPage: lastPage},
        {page: movies.page <= 5 ? 9 : movies.page >= lastPage-4 ? lastPage : movies.page + 4, maxPage: lastPage},
    ];

    const sort = [
        {sortBy: 'vote_count', title: 'Vote count', id: 4},
        {sortBy: 'vote_average', title: 'Vote average', id: 3},
        {sortBy: 'release_date', title: 'Release date', id: 2},
        {sortBy: 'popularity', title: 'Popular', id: 1},
    ]
    
    const firstPages = movies.total_pages < 10 ? pages.slice(0, movies.total_pages) : pages;


    return (           
        <>
            {!!moviesData &&
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header />
                </div>
                {!!searchValue && <div className={styles.searchResults}> Search results for «{searchValue}» : </div>}
                {!searchValue &&
                <div className={styles.button}>
                    { sort.map((sort) => (
                    <button key={sort.id} className={`${movieSortBy === sort.sortBy && styles.chosen}`} onClick={() => {sortBy(sort.sortBy); page(1); movieSortByButton(sort.sortBy) }} > {sort.title} </button>
                    ))}
                </div>}
                {movies.total_results !== 0 ?
                <div className={styles.MovieCard} >                
                    <MovieCard moviesData={moviesData} />
                </div> :
                <div className={styles.NoResults}>
                    No Results ☹
                </div>}
                <div className={styles.pages}>
                    {movies.page > 1 && <GrFormPrevious className={styles.GrFormPrevious} onClick={() =>  {window.scrollTo(0, 0); page(movies.page - 1)}} />}
                    <div className={styles.pagesContainer}>
                        {movies.page > 5 &&
                            lastPage > 9 &&
                            <>
                                <div className={`${movies.page === 1 && styles.active}`} onClick={() =>  { window.scrollTo(0, 0); page(1)}}> 1 </div>
                                ...
                            </>
                        }
                        { firstPages.map((pagesData) => (
                        <div className={`${pagesData.page === movies.page && styles.active}`} key={pagesData.page} onClick={() =>  { page(pagesData.page); window.scrollTo(0, 0)}} >  
                            {pagesData.page}
                        </div>
                        ))}
                        {movies.page < lastPage-4 &&
                            lastPage > 9 &&
                            <>
                                ...
                                <div className={`${movies.page === lastPage && styles.active}`} onClick={() =>  { window.scrollTo(0, 0); page(lastPage)}}> {lastPage} </div>
                            </>
                        }
                    </div>
                    {movies.page < movies.total_pages && <GrFormNext className={styles.GrFormNext} onClick={() =>  { window.scrollTo(0, 0); page(movies.page + 1)}} />}
                </div> 
            </div>}
        </>
    )
}