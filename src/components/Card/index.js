import styles from './Card.module.scss'
import {useState} from "react";

export function Card({id,title, price, imgUrl, onFavorite, onPlus, favorite = false}) {

    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorite)

    const onClickPlus = () => {
        onPlus({title, price, imgUrl})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id,title, price, imgUrl})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked"/>
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