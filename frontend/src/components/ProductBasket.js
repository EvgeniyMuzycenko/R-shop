import React from 'react';
import './ProductBasket.css';
import { FaRegTrashAlt } from "react-icons/fa";

function ProductBasket({ id, image, header, price, setBasket, setBasketPrice, setBasketQty, basket, basketPrice, basketQty }) {

  function deleteBasket() {
    setBasket(current => current.filter(product => product.id !== id))
    setBasketPrice(current => current - price)
    setBasketQty(current => current - 1)

    localStorage.setItem('basket', JSON.stringify(basket.filter(product => product.id !== id)))
    localStorage.setItem('basketPrice', JSON.stringify(basketPrice - price))
    localStorage.setItem('basketQty', JSON.stringify(basketQty - 1))
  }

  return (
    <div className="ProductBasket">
      <img src={image} alt="" />
      <div className='header-price'>
        <h1>{header}</h1>
        <p>{`${price} руб.`}</p>
      </div>
      <div className='btn-del'><FaRegTrashAlt size="25" onClick={() => deleteBasket()} /></div>
    </div>
  );
}

export default ProductBasket;