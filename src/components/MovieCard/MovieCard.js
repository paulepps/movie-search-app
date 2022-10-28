import styles from './MovieCard.module.scss';
import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { useState } from 'react';



export function MovieCard({moviesData, movieId}) {    
    const [over, setOver] = useState(true);

    return (
        <>            
            <div className={styles.container}>
                {moviesData.map((data) => (
                <div className={styles.movieCard} key={data.id} onClick={() => {setOver(false); movieId(data.id)}} onMouseEnter={() => {console.log(data.id)}}  onMouseLeave={() => setOver(true)} >
                    {over && <BsPlayCircle className={styles.hover}/>}
                    <img className={`${over && styles.img}`} src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt=""/>
                    <div className={styles.title}> {data.title} </div>
                    <div className={styles.date}> {data.release_date} </div>
                </div>
                ))}
            </div>
        </>
    )
}
//onClick={() => {dataId(undefined)}} onMouseLeave={}