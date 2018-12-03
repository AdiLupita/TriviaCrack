const { Router } = require('express');
const { CtrlQuestion } = require('../controllers');
const router = Router();

router.get('/question', CtrlQuestion.questionPage);
router.get('/question/add', CtrlQuestion.addQuestionPage);

module.exports = router;
