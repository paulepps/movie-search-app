import styles from './Header.module.scss';
import Logo from '../../img/Logo.PNG';
import { Genres } from '../../api';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context'
import { GrSearch } from 'react-icons/gr';
import { Link } from 'react-router-dom';

export function Header() {
    const [genres, setGenres] = useState('');
    const [focus, setFocus] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const {GenreId} = useContext(Context);
    const {ToDefault} = useContext(Context);
    const {FetchSearch} = useContext(Context);

    const navigate = useNavigate();
    const genresData = genres.genres;

    const HandleKeyPress = (event) => {
        if(event.key === 'Enter'){
            FetchSearch(searchValue);
            !!searchValue && navigate('/')
        }
    }

    useEffect(() => {
        async function FetchGenres() {
            return (
                setGenres(await Genres())
            )
        }
        FetchGenres()
    }, [])


    return (
        <>
            <div className={styles.headerTop}>
                <img onClick={() => {navigate('/'); ToDefault(); FetchSearch() }} className={styles.headerLogo} src={Logo} alt=""/>
            </div>
            <div className={styles.headerBot}>
                <div className={styles.name} onClick={() => setFocus(!focus)} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
                    Movie genres
                </div>
                {focus && 
                <div className={styles.menuContainer} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
                    <div className={styles.dropdownMenu} > 
                        {genresData.map((data) => (
                            <Link to='/' className={styles.data} key={data.id} onClick={() => {GenreId(data.id); FetchSearch(); setFocus(false)}} > {data.name} </Link>
                        ))}
                    </div>
                </div>}
                <div className={styles.inputContainer}>
                    <GrSearch className={styles.grSearch} />
                    <input maxLength="100" placeholder="Enter movie title" onKeyPress={HandleKeyPress} onChange={(event) => setSearchValue(event.target.value)} />
                    <button onClick={() => {FetchSearch(searchValue); !!searchValue && navigate('/')}}> Search </button>
                </div>                
            </div>
        </>
    );
}