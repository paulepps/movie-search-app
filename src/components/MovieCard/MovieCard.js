import styles from './MovieCard.module.scss';
import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import NoContent from '../../img/NoContent.png';

export function MovieCard({moviesData}) {
    return (
        <>            
            <div className={styles.container}>
                {moviesData.map((data) => (
                <div className={styles.movieCard} key={data.id+1} >
                    <Link to={`movie-search-app/MovieDetails/${data.id}`} className={styles.link} >
                        <BsPlayCircle className={styles.hover}/>
                        <img className={styles.img} src={!!data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : NoContent} alt=""/>
                        <div className={styles.title}> {data.title} </div>
                        <div className={styles.date}> {data.release_date} </div>
                    </Link>
                </div>
                ))}
            </div>
        </>
    )
}