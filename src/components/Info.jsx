import React, {useContext} from 'react'
import {AppContext} from "../App";

export const Info = ({title, description, img, onClick}) => {

    const {setCartOpened}= useContext(AppContext)

    return <div className={"cartEmpty d-flex align-center justify-center flex-column flex"}>
        <img className={'mb-20'} style={{width: '120px', height:'130px'}}
             src={img}
             alt="Empty cart"/>
        <h2>{title}</h2>
        <p className={'opacity-6'}> {description}</p>
        <button onClick={()=>setCartOpened(false)} className={'greenButton'}>
            <img src="img/arrow.svg" alt="Arrow"/>
            Вернуться назад
        </button>
    </div>
}