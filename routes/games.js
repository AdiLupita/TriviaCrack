const { Router } = require('express');
const { CtrlGame } = require('../controllers');
const router = Router();

router.get('/game/select_adversary', CtrlGame.selectAdversaryPage);
router.get('/game/mode', CtrlGame.selectGameMode);
router.post('/game/select_adversary', CtrlGame.createGame);
router.get('/game/roulette', CtrlGame.roulettePage);
router.get('/game/finish', CtrlGame.gameFinishPage);
router.get('/game/rand_category', CtrlGame.getRandomCategory);

router.get('/games', CtrlGame.indexPage);

module.exports = router;
