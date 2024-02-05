import React, { useState, useEffect } from 'react';
import './Main.css';
import Product from '../components/Product';
import ModalBoxProduct from '../components/ModalBoxProduct';

function Main({ setBasket, setBasketPrice, basketPrice, setBasketQty, basketQty, basket, setModalBox, setMessage, productCard, setProductCard }) {

  const [products, setProducts] = useState([])
  const [modalProdIsOpen, setmodalProdIsOpen] = useState(false)

  useEffect(() => {
    const api = 'http://127.0.0.1:9001/products'

    fetch(api)
      .then(result => result.json())
      .then((result) => {
        console.log(result)
        setProducts(result.data)
      })
  }, [])

  return (
    <div className="Main">
      {products.length ?
        (products.map((item) =>
          <Product key={item._id} id={item._id} header={item.header} image={item.image} price={item.price} ram={item.ram} screen={item.screen} cpu={item.cpu} graphics={item.graphics} storage={item.storage} setBasket={setBasket} setBasketPrice={setBasketPrice} basketPrice={basketPrice} setBasketQty={setBasketQty} basketQty={basketQty} basket={basket} setModalBox={setModalBox} setMessage={setMessage} productCard={productCard} setProductCard={setProductCard} setmodalProdIsOpen={setmodalProdIsOpen} />))
        : (<p>Нет товаров</p>)}
      <ModalBoxProduct productCard={productCard} isOpen={modalProdIsOpen} onClose={() => setmodalProdIsOpen(false)} setBasket={setBasket} setBasketPrice={setBasketPrice} setBasketQty={setBasketQty} basket={basket} />
    </div>
  );
}

export default Main;