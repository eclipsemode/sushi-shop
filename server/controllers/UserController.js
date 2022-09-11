const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket} = require('../models/models');

class UserController {
  async registration(req, res, next) {
    const  { email, password, role, name, surname, tel, street, house, floor, entrance, room } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Неккоректный email или пароль.'))
    }

    if (!name) {
      return next(ApiError.badRequest('Введите имя.'))
    }

    if (!tel) {
      return next(ApiError.badRequest('Введите телефон.'))
    }

    const candidate = await User.findOne({where: {email}});

    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, password: hashPassword, role, name, surname, tel, street, house, floor, entrance, room});
    const basket = await Basket.create({userId: user.id});
    const token = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return res.json({token})
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не найден.'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль.'))
    }
    const token = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return res.json({token});
  }

  async auth(req, res) {
    const token = jwt.sign(
      {id: req.user.id, email: req.user.email, role: req.user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return res.json({token})
  }
}

module.exports = new UserController();