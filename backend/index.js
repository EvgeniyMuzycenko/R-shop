const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017/'

const express = require('express')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

const generateAccessToken = (id, login, email, role, name) => {
  const payload = {
    id, login, email, role, name
  }

  return jsonwebtoken.sign(payload, secret, { expiresIn: '24h' })
}

app.use(cors())
app.use(express.json())

app.post('/registration', async (req, res) => {
  console.log(req.body)
  const { login, password, email, name, role } = req.body
  const user = new User({ login, password, email, name, role })

  try {
    await user.save()
  } catch (err) {
    if (err && err.code !== 11000) {
      res.json({
        message: 'Неизвестная ошибка!'
      })
        .status(500)

      return
    }

    if (err && err.code === 11000) {
      res.json({
        message: 'Учетная запись уже существует!'
      })
        .status(400)
      console.error('Учетная запись уже существует!')

      return
    }
  }

  res.json({
    message: 'Вы успешно зарегистрировались!'
  })
})

app.post('/login', async (req, res) => {
  console.log(req.body)
  const { login, password } = req.body
  let user

  try {
    user = await User.findOne({ login })
  } catch (err) {
    res.json({
      message: 'Неизвестная ошибка!'
    })
      .status(500)

    return
  }

  if (!user) {
    return res.status(400).json({ message: 'Пользователь не найден!' })
  }
  if (user.password !== password) {
    return res.status(400).json({ message: 'Неверный логин или пароль!' })
  }
  const jwtToken = generateAccessToken(user._id, user.login, user.email, user.role, user.name)

  res.json({
    message: 'Вы успешно авторизованы!',
    token: jwtToken
  })
})

app.post('/user/changePassword', async (req, res) => {
  console.log(req.body)
  const { token, password } = req.body
  let user

  try {
    user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
      { password: password }, { returnOriginal: false })

    if (user === null) {
      res.json({
        message: 'Пользователь не найден!'
      })
        .status(400)
    }
  } catch (err) {
    res.json({
      message: 'Неизвестная ошибка!'
    })
      .status(500)

    return
  }

  res.json({
    message: 'Пароль изменён!',
    newPassword: user.password
  })
})

app.post('/user/changeEmail', async (req, res) => {
  console.log(req.body)
  const { token, email } = req.body
  let user

  try {
    user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
      { email: email }, { returnOriginal: false })

    if (user === null) {
      res.json({
        message: 'Пользователь не найден!'
      })
        .status(400)
    }
  } catch (err) {
    if (err && err.code !== 11000) {
      res.json({
        message: 'Неизвестная ошибка!'
      })
        .status(500)

      return
    }

    if (err && err.code === 11000) {
      res.json({
        message: 'e-mail уже существует!'
      })
        .status(400)
      console.error('e-mail уже существует!')

      return
    }
  }

  res.json({
    message: 'e-mail изменён!',
    newEmail: user.email
  })
})

app.post('/user/changeName', async (req, res) => {
  console.log(req.body)
  const { token, name } = req.body
  let user

  try {
    user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
      { name: name }, { returnOriginal: false })

    if (user === null) {
      res.json({
        message: 'Пользователь не найден!'
      })
        .status(400)
    }
  } catch (err) {
    res.json({
      message: 'Неизвестная ошибка!'
    })
      .status(500)

    return
  }

  res.json({
    message: 'Имя изменено!',
    newName: user.name
  })
})

app.post('/user/changeLogin', async (req, res) => {
  console.log(req.body)
  const { token, login } = req.body
  let user

  try {
    user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
      { login: login }, { returnOriginal: false })

    if (user === null) {
      res.json({
        message: 'Пользователь не найден!'
      })
        .status(400)
    }
  } catch (err) {
    res.json({
      message: 'Неизвестная ошибка!'
    })
      .status(500)

    return
  }

  res.json({
    message: 'Логин изменён!',
    newLogin: user.login
  })
})

app.get('/products', async (req, res) => {
  let products

  try {
    products = await Product.find()
  } catch (err) {
    res.json({
      message: 'Неизвестная ошибка!'
    })
      .status(500)

    return
  }

  res.json({
    data: products
  })
})

app.post('/products/add', async (req, res) => {
  console.log(req.body)
  const { header, price, image, cpu, graphics, screen, storage, ram } = req.body
  const product = new Product({ header, price, image, cpu, graphics, screen, storage, ram })

  try {
    await product.save()
  } catch (err) {
    if (err && err.code !== 11000) {
      res.json({
        message: 'Неизвестная ошибка!'
      })
        .status(500)

      return
    }
  }

  res.json({
    message: 'Товар успешно добавлен!'
  })
})

const start = async () => {
  try {
    await mongoose.connect(URLDB)
    app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()