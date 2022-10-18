import styles from './Header.module.scss';
import Logo from '../../img/Logo.PNG';
import { Dropdown } from '../../components/Dropdown';
import { Genres } from '../../api';
import { useEffect, useState } from 'react';

export function Header() {
    const [genres, setGenres] = useState('');

    const genresData = genres.genres;

    useEffect(() => {
        async function fetchGenres() {
            return (
                setGenres(await Genres())
            )
        }
        fetchGenres()
    }, [])


    return (
        <>
            <div className={styles.headerTop}>
                <img className={styles.headerLogo} src={Logo} alt=""/>
            </div>
            <div className={styles.headerBot}>
                <Dropdown name={'Movie genres'} data={genresData} />     
            </div>
        </>
    );
}