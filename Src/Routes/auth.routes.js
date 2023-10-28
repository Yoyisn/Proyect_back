const { techRegister, register, techLogin, login, logout, techProfile, profile, verifyToken } = require('../Controllers/auth.controller.js');
const { techRegisterSchema, registerSchema, loginSchema } = require('../Schemas/auth.schema.js');

const { validateSchema } = require('../Middlewares/validator.middleware.js');
const { authRequired } = require('../Middlewares/validateToken.js');

const { Router } = require('express');
const router = Router();

router.post('/login', validateSchema(loginSchema), login);

router.post('/techLogin', validateSchema(loginSchema), techLogin);

router.post('/logout', logout);

router.post('/register', validateSchema(registerSchema), register);

router.post('/techRegister', validateSchema(techRegisterSchema), techRegister);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

router.get('/techProfile', authRequired, techProfile);

module.exports = router;