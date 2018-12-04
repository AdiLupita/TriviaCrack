const { Router } = require('express');
const generalsRoute = require('./generals');
const usersRoute = require('./users');
const gamesRoute = require('./games');
const questionsRoute = require('./questions');

const router = Router();

router.use(usersRoute);
router.use(gamesRoute);
router.use(questionsRoute);
router.use(generalsRoute);

module.exports = router;
