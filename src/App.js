import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {createContext, useEffect, useState} from "react";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";


export const AppContext = createContext({})

function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const itemsResponse = await axios.get('https://2e5a85215fc0073f.mokky.dev/items')
            const cartResponse = await axios.get('https://2e5a85215fc0073f.mokky.dev/cart')
            const favoritesResponse = await axios.get('https://2e5a85215fc0073f.mokky.dev/favorites')
            setIsLoading(false)

            setItems(itemsResponse.data)
            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)

        }

        fetchData();
    }, []);


    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => +item.parentId !== +obj.id));
                await axios.delete(`https://2e5a85215fc0073f.mokky.dev/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const {data} = await axios.post('https://2e5a85215fc0073f.mokky.dev/cart', obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://2e5a85215fc0073f.mokky.dev/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из корзины');
            console.error(error);
        }
    }


    const onAddToFavorites = async (obj) => {

        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://2e5a85215fc0073f.mokky.dev/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://2e5a85215fc0073f.mokky.dev/favorites', obj,);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
            console.error(error);
        }



    }


    const onChangeSearchInput = (e) => {
        setSearchValue(e.currentTarget.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => +obj.parentId === +id);
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                onAddToCart,
                onAddToFavorites,
                isItemAdded,
                setCartOpened,
                setCartItems
            }}>
            <div className="wrapper clear">
                {cartOpened && <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                />}
                <Header onClickCart={() => setCartOpened(true)}/>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorites={onAddToFavorites}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                        exact
                    />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites/>
                        }
                        exact
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
