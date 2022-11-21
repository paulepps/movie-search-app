import styles from './Header.module.scss';
import Logo from '../../img/Logo.PNG';
import { Dropdown } from '../../components/Dropdown';
import { Genres } from '../../api';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context'

export function Header() {
    const [genres, setGenres] = useState('');
    const {GenreId} = useContext(Context);

    const navigate = useNavigate();
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
            <div onClick={() => {navigate('/'); GenreId() }} className={styles.headerTop}>
                <img className={styles.headerLogo} src={Logo} alt=""/>
            </div>
            <div className={styles.headerBot}>
                {window.location.href === 'http://localhost:3000/' &&
                    <Dropdown name={'Movie genres'} data={genresData} />
                }
                {window.location.href !== 'http://localhost:3000/' &&
                    <button onClick={() => navigate(-1)} > 
                        Back &gt; 
                    </button>  
                } 
            </div>
        </>
    );
}