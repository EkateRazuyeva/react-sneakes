import styles from './Card.module.scss'
import {useState} from "react";

export function Card({title, price, imgUrl,onFavorite, onPlus}) {

    const [isAdded, setIsAdded] = useState(false)

    const onClickPlus = () => {
        onPlus({title,price,imgUrl})
        setIsAdded(!isAdded)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className={'d-flex justify-between align-center'}>
                <div className={'d-flex flex-column'}>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus}
                     onClick={onClickPlus}
                     src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                     alt="Plus"/>
            </div>
        </div>
    )
}