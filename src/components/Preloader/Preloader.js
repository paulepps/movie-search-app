import styles from './Preloader.module.scss';
import React from 'react';
import Spinner from '../../img/Spinner.gif';
//import { useEffect, useState } from 'react';

export function Preloader() {
    return (
        <div className={styles.preloader}>
            <img className={styles.spinner} src={Spinner} alt=""/> 
        </div>
    );
}