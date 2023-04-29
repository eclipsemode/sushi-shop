import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from 'app/assets/img/empty-cart.png';
import SimpleButton from "../../shared/UI/SimpleButton";

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вы еще ничего не добавили в корзину.
                <br />
                Для заказа, вернитесь на главную страницу.
            </p>
            <img src={emptyCartImg} alt="Empty cart" />
          <Link to={'/'}>
          <SimpleButton>Вернуться на главную</SimpleButton>
          </Link>
        </div>
    );
};

export default CartEmpty;
