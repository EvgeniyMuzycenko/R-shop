import React from 'react';
import './AddProductBox.css';
import { FaX } from "react-icons/fa6";

function AddProductBox({ setModalBox, setMessage }) {

  function AddProduct() {
    const header = document.getElementById('header').value
    const price = document.getElementById('price').value
    const image = document.getElementById('image').value
    const cpu = document.getElementById('cpu').value
    const graphics = document.getElementById('graphics').value
    const screen = document.getElementById('screen').value
    const storage = document.getElementById('storage').value
    const ram = document.getElementById('ram').value

    const validPrice = price.match(/^\d+$/)

    let message

    if (!validPrice || header.length === 0 || image.lenght === 0 || cpu.lenght === 0 ||
      graphics.length === 0 || screen.length === 0 || storage.lenght === 0 || ram.lenght === 0) {
      document.getElementById('addProductError').innerText = "Заполнены не все поля или неверные данные!"
      return
    }

    const data = {
      header: header,
      price: price,
      image: image,
      cpu: cpu,
      ram: ram,
      graphics: graphics,
      screen: screen,
      storage: storage
    }

    const api = 'http://127.0.0.1:9001/products/add'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => message = result.message)

    setTimeout(() => {
      setMessage(message)
      setModalBox('MessageBox')
    }, 100)
  }

  return (
    <div className="AddProductBox">
      <h1>Добавление товара</h1>
      <input id='header' placeholder='Название товара' type='text' />
      <input id='price' placeholder='Цена товара' type='text' />
      <input id='image' placeholder='Ссылка на изображение' type='text' />
      <input id='cpu' placeholder='Процессор' type='text' />
      <input id='ram' placeholder='Оперативная память' type='text' />
      <input id='graphics' placeholder='Видеокарта' type='text' />
      <input id='screen' placeholder='Экран' type='text' />
      <input id='storage' placeholder='Объем накопителя' type='text' />
      <button id='send' onClick={() => AddProduct()}>Добавить</button>
      <p id='addProductError'></p>
      <FaX className='btn-close' id='send' onClick={() => setModalBox('none')} />
    </div>
  );
}

export default AddProductBox;