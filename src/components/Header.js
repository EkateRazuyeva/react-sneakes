import {Link} from 'react-router-dom'
import {useCart} from "../hooks/useCart";

export function Header(props) {
    const {totalPrice} = useCart()

    return (
        <header className={'d-flex justify-between align-center p-40'}>
            <Link to={process.env.PUBLIC_URL + '/'}>
                <div className={'d-flex align-center'}>
                    <img width={40} height={40} src='img/logo.png' alt="logo"/>
                    <div>
                        <h3 className={'text-uppercase'}>React sneakers</h3>
                        <p className={'opacity-5'}>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={'d-flex'}>
                <li onClick={props.onClickCart} className={'mr-30 cu-p'}>
                    <img width={18} height={18} src="img/cart.svg" alt="cart"/>
                    <span>{totalPrice} руб</span>
                </li>
                <li className={'mr-20 cu-p'}>
                    <Link to={process.env.PUBLIC_URL + '/favorites'}>
                        <img width={18} height={18} src="img/heart.svg" alt="Heart"/>
                    </Link>
                </li>
                <li>
                    <Link to={process.env.PUBLIC_URL + '/orders'}>
                        <img width={18} height={18} src="img/user.svg" alt="User"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}