import { Header } from '../../components/Header';
//import { ElementPage } from '../../components/ElementPage';
import { MovieCard } from '../../components/MovieCard';
import styles from './MainPage.module.scss';
import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { Discover } from '../../api';
import { useEffect, useState } from 'react';



export function MainPage() {
    const [discover, setDiscover] = useState('');
    let [isActive, setIsActive] = useState(1);

    const discoverData = discover.results;

    const pages = [
        {page: discover.page <= 5 ? 1 : discover.page >= 496 ? 492 : discover.page - 4},
        {page: discover.page <= 5 ? 2 : discover.page >= 496 ? 493 : discover.page - 3},
        {page: discover.page <= 5 ? 3 : discover.page >= 496 ? 494 : discover.page - 2},
        {page: discover.page <= 5 ? 4 : discover.page >= 496 ? 495 : discover.page - 1},
        {page: discover.page <= 5 ? 5 : discover.page >= 496 ? 496 : discover.page},
        {page: discover.page <= 5 ? 6 : discover.page >= 496 ? 497 : discover.page + 1},
        {page: discover.page <= 5 ? 7 : discover.page >= 496 ? 498 : discover.page + 2},
        {page: discover.page <= 5 ? 8 : discover.page >= 496 ? 499 : discover.page + 3},
        {page: discover.page <= 5 ? 9 : discover.page >= 496 ? 500 : discover.page + 4},
    ];

    async function fetchDiscover() {
        return (
            setDiscover(await Discover(isActive))
        )
    }

    useEffect(() => {
        fetchDiscover()
        console.log(Discover())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        discoverData === undefined
        ?
        <div> ??? </div>
        :
        <div className={styles.container}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.button}>
                <button> Release date </button>
                <button> Popularity </button>
            </div>
            <div className={styles.MovieCard} >                
                <MovieCard discoverData={discoverData} />
            </div>
            <div className={styles.pages}>
                {discover.page > 1 && <GrFormPrevious className={styles.GrFormPrevious} onClick={() =>  {fetchDiscover(); window.scrollTo(0, 0)}} onMouseEnter={() => setIsActive(discover.page - 1)} />}
                <div className={styles.pagesContainer}>
                    {discover.page > 5 &&
                        <>
                            <div className={`${discover.page === 1 && styles.active}`} onMouseEnter={() => setIsActive(1)} onClick={() =>  {fetchDiscover(); window.scrollTo(0, 0)}}> 1 </div>
                            ...
                        </>
                    }
                    { pages.map((pages) => ( 
                    <div className={`${pages.page === discover.page && styles.active}`} key={pages.page} onMouseEnter={() => setIsActive(pages.page)} onClick={() =>  {fetchDiscover(); window.scrollTo(0, 0)}} >  
                        {pages.page}
                    </div>
                    ))}
                    {discover.page < 496 &&
                        <>
                            ...
                            <div className={`${discover.page === 500 && styles.active}`} onMouseEnter={() => setIsActive(500)} onClick={() =>  {fetchDiscover(); window.scrollTo(0, 0)}}> 500 </div>
                        </>
                    }
                </div>
                {discover.page < 500 && <GrFormNext className={styles.GrFormNext} onClick={() =>  {fetchDiscover(); window.scrollTo(0, 0)}} onMouseEnter={() => setIsActive(discover.page + 1)}/>}
            </div>
        </div>
    )
}

//(e) => this.setState({ сompanyName: e.target.value })