import {Card} from "../components/Card";
import React, {useContext} from "react";
import {AppContext} from "../App";
import {Link} from "react-router-dom";

export const Favorites = () => {

    const {favorites, onAddToFavorites} = useContext(AppContext)

    return (
        <div className="content p-40">
            {favorites.length > 0 ?
                <div>
                    <div className={'d-flex align-center justify-between mb-40'}>
                        <h1>Мои закладки</h1>
                    </div>
                    <div className={'d-flex flex-wrap'}>
                        {
                            favorites
                                .map((item, index) => (
                                    <Card key={index}
                                          favorite={true}
                                          onFavorite={onAddToFavorites}
                                          {...item}
                                    />
                                ))
                        }
                    </div>
                </div>
                :
                <div className={"cartEmpty d-flex align-center justify-center flex-column flex"}>
                    <img className={'mb-20'} style={{width: '100px', height: '100px'}}
                         src={'img/favorite_emoji.png'}
                         alt="favorite_emoji"/>
                    <h2>{'Закладок нет :('}</h2>
                    <p className={'opacity-6'}> {'Вы ничего не добавляли в закладки'}</p>

                    <Link to={process.env.PUBLIC_URL + '/'}>
                        <button className={'greenButton'}>
                            <img src="img/arrow.svg" alt="Arrow"/>
                            Вернуться назад
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}