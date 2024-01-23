import React, { useState } from 'react';
import './ProductBasket.css';
import { FaRegTrashAlt } from "react-icons/fa";

function ProductBasket({ id, image, header, price, setBasket, setBasketPrice, setBasketQty }) {

  const [qty, setQty] = useState(1)

  function deleteBasket() {
    setBasket(current => current.filter(product => product.id !== id))
    setBasketPrice(current => current - (price * qty))
    setBasketQty(current => current - qty)
  }

  function plus() {
    setQty(current => current + 1)
    setBasketPrice(current => current + price)
    setBasketQty(current => current + 1)
  }

  function minus() {
    if (qty > 1) {
      setQty(current => current - 1)
      setBasketPrice(current => current - price)
      setBasketQty(current => current - 1)
    }
  }

  return (
    <div className="ProductBasket">
      <img src={image} alt="" />
      <div>
        <h1>{header}</h1>
        <p>{`${price} руб.`}</p>
        <div className='basketQty'>
          <button className='minus' onClick={() => minus()}>-</button>
          <p className='qty'>{qty}</p>
          <button className='plus' onClick={() => plus()}>+</button>
        </div>
      </div>
      <div className='btn-del'><FaRegTrashAlt size="25" onClick={() => deleteBasket()} /></div>
    </div>
  );
}

export default ProductBasket;