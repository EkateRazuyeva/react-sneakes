import React, {useEffect, useState} from "react";
import {Card} from "../components/Card";
import axios from "axios";
import {Info} from "../components/Info";
import {Link} from "react-router-dom";


export const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://2e5a85215fc0073f.mokky.dev/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false)
            } catch (e) {
                alert("Ошибка при запросе заказов")
                console.error(e)
            }
        })()
    }, [])

    return (
        <div className="content p-40">
            {orders.length > 0 ?
                <div>
                    <div className={'d-flex align-center justify-between mb-40'}>
                        <h1>Мои заказы</h1>
                    </div>
                    <div className={'d-flex flex-wrap'}>
                        {isLoading ? [...Array(12)] : orders
                            .map((item, index) => (
                                <Card key={index}
                                      loading={isLoading}
                                      {...item}/>
                            ))
                        }
                    </div>
                </div>
                : <div className={"cartEmpty d-flex align-center justify-center flex-column flex"}>
                    <img className={'mb-20'} style={{width: '100px', height: '100px'}}
                         src={'img/orders_emoji.png'}
                         alt="orders_emoji"/>
                    <h2>{'У вас нет заказов'}</h2>
                    <p className={'opacity-6'}> {'Оформите хотя бы один заказ.'}</p>

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