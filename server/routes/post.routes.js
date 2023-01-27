const { Router } = require('express');
const { body } = require('express-validator');
const { Register, Login, currentUser } = require('../controllers/AuthController');
const auth = require('../middlewares/auth');
const { LoginValidator, RegisterValidator } = require('../validators/AuthValidator')


const router = Router();

router.post('/register', [...RegisterValidator], Register);

router.post('/login', LoginValidator, Login);

router.get("/user", [auth], currentUser);

module.exports = router;