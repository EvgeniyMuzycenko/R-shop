import React from 'react';
import './OrderBox.css';
import { FaX } from "react-icons/fa6";

function OrderBox({ setModalBox, setMessage, setBasket, setBasketQty, setBasketPrice }) {
    function order() {
        const cardNum = document.getElementById('cardNum').value
        const cvc = document.getElementById('cvc').value
        const cardExp = document.getElementById('cardExp').value

        const validNum = cardNum.match(/^\d{12,16}$/)
        const validCvc = cvc.match(/^[0-9]{3,4}$/)

        if (!validNum) {
            document.getElementById('orderError').innerText = "Неккоректный номер катры!"
            return
        }

        if (!cardExp) {
            document.getElementById('orderError').innerText = "Не указан срок действия карты!"
            return
        }

        if (!validCvc) {
            document.getElementById('orderError').innerText = "Неккоректный cvc код!"
            return
        }

        setTimeout(() => {
            setBasket([])
            setBasketQty(0)
            setBasketPrice(0)
            setMessage('Заказ успешно оформлен!')
            setModalBox('MessageBox')
        }, 100)
    }

    return (
        <div className="OrderBox">
            <input id='cardNum' placeholder='Номер карты' type='text' maxLength='16' />
            <p>Скрок действия:</p>
            <input id='cardExp' type='month' />
            <input id='cvc' placeholder='CVC-код' type='password' maxLength='3' />
            <button id='send' onClick={() => order()}>Оформить заказ</button>
            <p id='orderError'></p>
            <FaX className='btn-close' id='send' onClick={() => setModalBox('none')} />
        </div>
    );
}

export default OrderBox;