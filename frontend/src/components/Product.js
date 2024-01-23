import React from 'react';
import './Product.css';

function Product({ id, image, header, price, ram, screen, cpu, graphics, storage, setBasket, setBasketPrice, setBasketQty, basket, setModalBox, setMessage, setProductCard, setmodalProdIsOpen }) {

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
    const index = basket.findIndex(value => value.id === product.id)
    console.log(index)

    if (index < 0) {
      setBasket(prevState => [...prevState, product])
      setBasketPrice(current => current + product.price)
      setBasketQty(current => current + 1)
    } else {
      return
    }
    setTimeout(() => {
      setMessage('Товар добавлен в корзину!')
      setModalBox('MessageBox')
    }, 100)
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
      <button className='btn-add-to-cart' onClick={() => addToBasket()}>В корзину</button>
    </div>
  );
}

export default Product;