import styles from './MovieCard.module.scss';
import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export function MovieCard({moviesData}) {

    return (
        <>            
            <div className={styles.container}>
                {moviesData.map((data) => (
                <div className={styles.movieCard} key={data.id+1} >
                    <Link to={`/MovieDetails/${data.id}`} className={styles.link} >
                        <BsPlayCircle className={styles.hover}/>
                        <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt=""/>
                        <div className={styles.title}> {data.title} </div>
                        <div className={styles.date}> {data.release_date} </div>
                    </Link>
                </div>
                ))}
            </div>
        </>
    )
}