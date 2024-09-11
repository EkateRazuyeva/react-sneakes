import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import {useContext} from "react";

import {AppContext} from "../../App";

export function Card({
                         id,
                         title,
                         price,
                         imgUrl,
                         onFavorite,
                         onAddToCart,
                         loading = false,
                     }) {

    const {isItemAdded, isItemFavorite} = useContext(AppContext)

    const obj = {id, parentId: id, title, price, imgUrl}

    const onClickPlus = () => {
        onAddToCart(obj)
    }

    const onClickFavorite = () => {
        onFavorite(obj)
    }

    return (
        <div className={styles.card}>
            {loading ?
                <ContentLoader
                    speed={2}
                    width={620}
                    height={220}
                    viewBox="0 0 600 220"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                    <rect x="0" y="118" rx="5" ry="5" width="150" height="15"/>
                    <rect x="82" y="43" rx="0" ry="0" width="0" height="1"/>
                    <rect x="0" y="144" rx="5" ry="5" width="100" height="15"/>
                    <rect x="0" y="178" rx="5" ry="5" width="80" height="25"/>
                    <rect x="118" y="171" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader>
                : <>
                    {onFavorite &&
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isItemFavorite(id) ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked"/>
                        </div>
                    }
                    <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className={'d-flex justify-between align-center'}>
                        <div className={'d-flex flex-column'}>
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onAddToCart && <img className={styles.plus}
                                             onClick={onClickPlus}
                                             src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
                                             alt="Plus"/>}
                    </div>
                </>
            }
        </div>
    )
}

