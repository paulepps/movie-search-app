import styles from './Dropdown.module.scss';
import React from 'react';
import { useState } from 'react';



export function Dropdown({name, data}) {
    const [focus, setFocus] = useState(false);

    const dropdownMenu = focus && 
    <div className={styles.menuContainer} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
            <div className={styles.fackeName} >
                {name}
            </div>  
        <div className={styles.dropdownMenu} > 
            {data.map((data) => (
                <div className={styles.data} key={data.id}> {data.name} </div>
            ))}
        </div>
    </div>;

    return (
        <>
            <div className={styles.name} onMouseOver={() => setFocus(true)} onMouseOut={() => setFocus(false)}>
                {name}
            </div>
            {dropdownMenu} 
        </>       
    );
}

//  onClick={() => console.log()} 