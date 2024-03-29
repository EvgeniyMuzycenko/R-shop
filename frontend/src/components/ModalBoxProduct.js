import React from 'react';
import './ModalBoxProduct.css';
import Modal from 'react-modal'
import { FaX } from "react-icons/fa6";

function ModalBoxProduct({ productCard, isOpen, onClose, setBasket,
  setBasketPrice, setBasketQty, basket }) {

  function addToBasket() {
    let inBasket = false;
    basket.forEach(element => {
      if (element.id === productCard.id)
        inBasket = true
    })
    console.log(inBasket)

    if (!inBasket) {
      setBasket(prevState => [...prevState, productCard])
      setBasketPrice(current => current + productCard.price)
      setBasketQty(current => current + 1)
      document.getElementById('checkMessage').innerText = "Товар добавлен в корзину!"
    } else {
      document.getElementById('checkMessage').innerText = "Товар уже в корзине!"
      return
    }
  }

  return (
    <Modal isOpen={isOpen}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
      ariaHideApp={false}
      closeTimeoutMS={300}
      onRequestClose={() => onClose()}>
      <div className="ModalBoxProduct">
        <img src={productCard.image} alt="" />
        <h1>{productCard.header}</h1>
        <p>Экран: {productCard.screen}''</p>
        <p>Процессор: {productCard.cpu}</p>
        <p>Оперативная память: {productCard.ram} ГБ</p>
        <p>Графика: {productCard.graphics}</p>
        <p>Объем накопителя: {productCard.storage} ГБ</p>
        <p className='price'>
          {new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            currencyDisplay: 'narrowSymbol',
            maximumSignificantDigits: 5
          }).format(productCard.price)}
        </p>
        <button onClick={() => addToBasket()}>В корзину</button>
        <p className='check' id='checkMessage'></p>
        <FaX className="modal-close-btn" onClick={() => onClose()} size="20" />
      </div>
    </Modal>
  );
}


export default ModalBoxProduct;