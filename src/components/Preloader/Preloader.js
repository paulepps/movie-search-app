import styles from './Preloader.module.scss';
import React from 'react';
import Spinner from '../../img/Spinner.gif';

export function Preloader() {
    return (
        <div className={styles.preloader}>
            <img className={styles.spinner} src={Spinner} alt=""/> 
        </div>
    );
}