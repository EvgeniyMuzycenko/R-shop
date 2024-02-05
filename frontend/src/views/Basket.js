import React from 'react';
import './Basket.css';
import ProductBasket from '../components/ProductBasket';

function Basket({ basket, setBasket, basketPrice, setBasketPrice, basketQty, setBasketQty, setModalBox, token }) {

  function showOrders() {
    return (
      <div className="basket-item">
        {basket.map((item) => <ProductBasket key={item.id} id={item.id} header={item.header} image={item.image} price={item.price} setBasket={setBasket} setBasketPrice={setBasketPrice} setBasketQty={setBasketQty} basket={basket} basketPrice={basketPrice} basketQty={basketQty} />)}
        <p>Количество товаров: {basketQty}</p>
        <p>Общая стоимость товаров: {basketPrice}</p>
        {showBtnBuy()}
      </div>
    )
  }

  function showNothing() {
    localStorage.clear('basket')
    return (
      <div className='empty'>
        <h2>Товаров нет</h2>
      </div>
    )
  }

  function showBtnBuy() {
    if (token !== null) {
      return (
        <>
          <button className="order" onClick={() => setModalBox('OrderBox')}>Оформить заказ</button>
        </>
      )
    } else {
      return (
        <p className='authText'>Авторизуйтесь для оформления заказа!</p>
      )
    }
  }

  return (
    <div className="Basket">
      <h1>Корзина</h1>
      <div className="basket-item">
        {basket.length > 0 ? showOrders() : showNothing()}
      </div>
    </div>
  );
}

export default Basket;