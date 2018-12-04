const { Router } = require('express');
const { CtrlGame } = require('../controllers');
const router = Router();

router.get('/game/select_adversary', CtrlGame.selectAdversaryPage);
router.get('/game/roulette', CtrlGame.roulettePage);

module.exports = router;
