import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";


function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://2e5a85215fc0073f.mokky.dev/items')
            .then((res) => {
                setItems(res.data)
            });
        axios.get('https://2e5a85215fc0073f.mokky.dev/cart')
            .then((res) => {
                setCartItems(res.data)
            });
        axios.get('https://2e5a85215fc0073f.mokky.dev/favorites')
            .then((res) => {
                setFavorites(res.data)
            })
    }, []);


    const onAddToCart = (obj) => {
        axios.post('https://2e5a85215fc0073f.mokky.dev/cart', obj)
        setCartItems(prev => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://2e5a85215fc0073f.mokky.dev/cart/${id}`)
        setCartItems(prev => prev.filter((item) => item.id !== id))
    }

    const onAddToFavorites = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)) {
                axios.delete(`https://2e5a85215fc0073f.mokky.dev/favorites/${obj.id}`)
                setFavorites(prev => prev.filter((item) => item.id !== obj.id))
            } else {
                const {data} = await axios.post('https://2e5a85215fc0073f.mokky.dev/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (e) {
           alert('Не удалось добавить в фавориты')
        }
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.currentTarget.value)
    }

    return (
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
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorites={onAddToFavorites}
                            onAddToCart={onAddToCart}
                        />
                    }
                    exact
                />
                <Route
                    path="/favorites"
                    element={
                        <Favorites items={favorites} onAddToFavorites={onAddToFavorites}/>
                    }
                    exact
                />
            </Routes>
        </div>
    );
}

export default App;
