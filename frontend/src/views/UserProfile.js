import React from 'react';
import './UserProfile.css';
import { jwtDecode } from 'jwt-decode';

function UserProfile({ token, setModalBox }) {

  function changeEmail() {
    const email = document.getElementById('email').value

    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)

    if (!validEmail) {
      document.getElementById('emailMessage').innerText = "Неверные данные!"
      return
    }

    const data = {
      token: token,
      email: email
    }

    console.log(data)

    const api = 'http://127.0.0.1:9001/user/changeEmail'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result)
        document.getElementById('emailMessage').innerText = "e-mail успешно изменён!"
      })
  }

  function changePass() {
    const pass = document.getElementById('pass').value

    if (pass.length === 0) {
      document.getElementById('emailMessage').innerText = "Неверные данные!"
      return
    }

    const data = {
      token: token,
      password: pass
    }

    console.log(data)

    const api = 'http://127.0.0.1:9001/user/changePassword'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result)
        document.getElementById('passMessage').innerText = "Пароль успешно изменён!"
      })
  }

  function changeName() {
    const name = document.getElementById('name').value

    if (name.length === 0) {
      document.getElementById('nameMessage').innerText = "Поле не может быть пустым!"
      return
    }

    const data = {
      token: token,
      name: name
    }

    console.log(data)

    const api = 'http://127.0.0.1:9001/user/changeName'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result)
        document.getElementById('nameMessage').innerText = "Имя успешно изменёно!"
      })
  }

  function changeLogin() {
    const login = document.getElementById('login').value

    if (login.length === 0) {
      document.getElementById('loginMessage').innerText = "Поле не может быть пустым!"
      return
    }

    const data = {
      token: token,
      login: login
    }

    console.log(data)

    const api = 'http://127.0.0.1:9001/user/changeLogin'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result)
        document.getElementById('loginMessage').innerText = "Логин успешно изменён!"
      })
  }

  function AddProduct() {
    if (jwtDecode(token).role === 'admin') {
      return (
        <>
          <button className='addProduct' onClick={() => setModalBox('AddProductBox')}>Добавить товар</button>
        </>
      )
    }
  }

  return (
    <div className="UserProfile">
      <h2>Добро пожаловать в личный кабинет, {jwtDecode(token).name}!</h2>
      <p id='showLogin'><u>Ваш логин:</u> <b>{jwtDecode(token).login}</b></p>
      <p id='showEmail'><u>Ваш e-mail:</u> <b>{jwtDecode(token).email}</b></p>
      <p id='showRole'><u>Ваш статус:</u> <b>{jwtDecode(token).role}</b></p>
      <AddProduct />
      <input id='login' placeholder='Логин' type='text' />
      <button id='sendLogin' onClick={changeLogin}>Сменить логин</button>
      <p id='loginMessage'></p>
      <input id='name' placeholder='Имя' type='text' />
      <button id='sendName' onClick={changeName}>Сменить имя</button>
      <p id='nameMessage'></p>
      <input id='email' placeholder='e-mail' type='email' />
      <button id='sendEmail' onClick={changeEmail}>Сменить e-mail</button>
      <p id='emailMessage'></p>
      <input id='pass' placeholder='Пароль' type='password' />
      <button id='sendPass' onClick={changePass}>Сменить пароль</button>
      <p id='passMessage'></p>
    </div>
  );
}

export default UserProfile;