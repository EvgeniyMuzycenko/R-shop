import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './views/Main';
import Basket from './views/Basket';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './views/UserProfile';
import MessageBox from './components/MessageBox';
import AddProductBox from './components/AddProductBox';
import OrderBox from './components/OrderBox';

function App() {

  const [page, setPage] = useState('Main')
  const [modalBox, setModalBox] = useState('none')
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || [])
  const [basketPrice, setBasketPrice] = useState(JSON.parse(localStorage.getItem('basketPrice')) || 0)
  const [basketQty, setBasketQty] = useState(JSON.parse(localStorage.getItem('basketQty')) || 0)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [message, setMessage] = useState('')
  const [productCard, setProductCard] = useState({})

  const pages = {
    Main: <Main setBasket={setBasket} setBasketPrice={setBasketPrice} basketPrice={basketPrice} setBasketQty={setBasketQty} basketQty={basketQty} basket={basket} setMessage={setMessage} setModalBox={setModalBox} token={token} productCard={productCard} setProductCard={setProductCard} />,
    Basket: <Basket basket={basket} setBasket={setBasket} basketPrice={basketPrice} setBasketPrice={setBasketPrice} basketQty={basketQty} setBasketQty={setBasketQty} setModalBox={setModalBox} token={token} />,
    UserProfile: <UserProfile token={token} setModalBox={setModalBox} />
  }

  const modalBoxes = {
    none: null,
    Login: <ModalBox setModalBox={setModalBox}><Login setModalBox={setModalBox} setToken={setToken} setMessage={setMessage} /></ModalBox>,
    Registration: <ModalBox setModalBox={setModalBox}><Registration setModalBox={setModalBox} setMessage={setMessage} /></ModalBox>,
    MessageBox: <ModalBox setModalBox={setModalBox}><MessageBox setModalBox={setModalBox} message={message} /></ModalBox>,
    AddProductBox: <ModalBox setModalBox={setModalBox}><AddProductBox setModalBox={setModalBox} setMessage={setMessage} /></ModalBox>,
    OrderBox: <ModalBox setModalBox={setModalBox}><OrderBox setMessage={setMessage} setModalBox={setModalBox} setBasket={setBasket} setBasketQty={setBasketQty} setBasketPrice={setBasketPrice} /></ModalBox>
  }

  return (
    <div className="App">
      <Header setPage={setPage} setModalBox={setModalBox} token={token} setToken={setToken} />
      {pages[page]}
      {modalBoxes[modalBox]}
      <Footer />
    </div>
  );
}

export default App;
