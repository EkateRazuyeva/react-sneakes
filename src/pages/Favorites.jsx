import {Card} from "../components/Card";
import {useContext} from "react";
import {AppContext} from "../App";

export const Favorites = () => {

    const {favorites,onAddToFavorites}= useContext(AppContext)

    return (
        <div className="content p-40">
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
    )
}