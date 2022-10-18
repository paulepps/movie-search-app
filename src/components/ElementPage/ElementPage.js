import styles from './ElementPage.module.scss';
import React from 'react';
import { useEffect, useState } from 'react';

export function ElementPage() {
    return (
        <div className={styles.container}>
            


            {data.adult}
                {data.original_language}
                {data.original_title}
                {data.overview}
                {data.popularity}
                {data.poster_path}
                {data.release_date}
                {data.title}
                {data.vote_average}
                {data.vote_count}
        </div>
    );
}