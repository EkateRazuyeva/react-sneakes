import {Info} from "./Info";
import {useContext, useState} from "react";
import {AppContext} from "../App";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Drawer({onClose, onRemove, items = []}) {
    const {setCartItems, cartItems} = useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://2e5a85215fc0073f.mokky.dev/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://2e5a85215fc0073f.mokky.dev/cart/' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };

    return (
        <div className={'overlay'}>
            <div className={'drawer'}>
                <h2 className={'mb-30 d-flex justify-between'}>Корзина
                    <img onClick={onClose} className={'removeBtn cu-p'} src="/img/btn-remove.svg" alt="Close"/>
                </h2>

                {items.length > 0
                    ? <div className={'d-flex flex-column flex'}>
                        <div className="items">
                            {items.map(obj => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imgUrl})`}}
                                         className={'cartItemImg'}></div>
                                    <div className={'mr-20 flex'}>
                                        <p className={'mb-5'}>{obj.title}</p>
                                        <b>{obj.price} руб</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className={'removeBtn'}
                                         src="/img/btn-remove.svg"
                                         alt="Remove"/>
                                </div>
                            ))}
                        </div>
                        <div className={'cartTotalBlock'}>
                            <ul>
                                <li className={'d-flex'}>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб. </b>
                                </li>
                                <li className={'d-flex'}>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>1074 руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={'greenButton'}>Оформить заказ
                                <img src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>

                    : <Info title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                            img={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                            description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                    />
                }
            </div>
        </div>
    )
}