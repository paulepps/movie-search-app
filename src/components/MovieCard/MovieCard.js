import styles from './MovieCard.module.scss';
import React from 'react';



export function MovieCard({popularityData}) {
    return (
        <div className={styles.container}>
            {popularityData.map((data) => (
            <div className={styles.movieCard} key={data.id}>
                <img className={styles.img} src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt=""/>
                <div className={styles.title}> {data.title} </div>
                <div className={styles.date}> {data.release_date} </div>
            </div>
            ))}
        </div>
    )
}
