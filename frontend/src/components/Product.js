import React from 'react';
import './Product.css';

function Product({ id, image, header, price, ram, screen, cpu, graphics, storage, setBasket, setBasketPrice, basketPrice, setBasketQty, basketQty, basket, setModalBox, setMessage, setProductCard, setmodalProdIsOpen }) {

  const product = {
    id: id,
    header: header,
    image: image,
    price: price,
    ram: ram,
    screen: screen,
    cpu: cpu,
    graphics: graphics,
    storage: storage
  }

  function addToBasket() {
    let inBasket = false;
    basket.forEach(element => {
      if (element.id === product.id)
        inBasket = true
    })
    console.log(inBasket)

    if (!inBasket) {
      setBasket(basket => [...basket, product])
      setBasketPrice(current => current + product.price)
      setBasketQty(current => current + 1)

      localStorage.setItem('basket', JSON.stringify([...basket, product]))
      localStorage.setItem('basketPrice', JSON.stringify(basketPrice + product.price))
      localStorage.setItem('basketQty', JSON.stringify(basketQty + 1))

      setTimeout(() => {
        setMessage('Товар добавлен в корзину!')
        setModalBox('MessageBox')
      }, 100)
    } else {
      setTimeout(() => {
        setMessage('Товар уже в корзине!')
        setModalBox('MessageBox')
      }, 100)
      return
    }
  }

  function onShow(productCard) {
    setProductCard(productCard)
    setmodalProdIsOpen(true)
    console.log(productCard)
  }

  return (
    <div className="Product">
      <img src={image} alt="" onClick={() => onShow(product)} />
      <h1>{header}</h1>
      <p>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', currencyDisplay: 'narrowSymbol', maximumSignificantDigits: 5 }).format(price)}</p>
      <button id='btn' onClick={() => addToBasket()}>В корзину</button>
    </div>
  );
}

export default Product;