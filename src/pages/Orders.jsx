import React, {useContext, useEffect, useState} from "react";
import {Card} from "../components/Card";
import axios from "axios";
import {Info} from "../components/Info";


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
                : <Info title={'У вас нет заказов'}
                        img={'img/orders_emoji.png'}
                        description={'Оформите хотя бы один заказ.'}
                />
            }

        </div>
    )
}