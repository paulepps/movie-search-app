import styles from './Dropdown.module.scss';
import React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../context'



export function Dropdown({name, data}) {
    const [focus, setFocus] = useState(false);
    const {GenreId} = useContext(Context);
    
    return (
        <>
            <div className={styles.name} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
                {name}
            </div>
            {focus && 
            <div className={styles.menuContainer} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
                    <div className={styles.fackeName} >
                        {name}
                    </div>  
                <div className={styles.dropdownMenu} > 
                    {data.map((data) => (
                        <div className={styles.data} key={data.id} onClick={() => GenreId(data.id)} > {data.name} </div>
                    ))}
                </div>
            </div>}
        </>       
    );
}

//  onClick={() => console.log()} 