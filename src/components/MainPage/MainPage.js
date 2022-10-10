import { Header } from '../../components/Header';
import { ElementPage } from '../../components/ElementPage';
import styles from './MainPage.module.scss';
import React from 'react';
import { useEffect, useState } from 'react';

export function MainPage() {
    return (
        <>
            <div className={styles.container}>
                <Header/>
                <ElementPage/>
            </div>
        </>
    );
}