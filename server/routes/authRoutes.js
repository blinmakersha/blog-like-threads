const Router = require('express')
const router = new Router()
const {check} = require("express-validator")
const authController = require('../controllers/authController')
const authLayout = '../views/layouts/auth';

router.get('/auth', async (req, res) => {
    try {
      const locals = {
        title: "Auth",
      }
  
      return res.status(200).render('auth/index', { locals, layout: authLayout });
    } catch (error) {
      console.log(error);
    }
  });
  
  
  
  router.post('/login', authController.login)
  router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
  ], authController.registration)

module.exports = router