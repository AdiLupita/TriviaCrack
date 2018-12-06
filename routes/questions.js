const { Router } = require('express');
const { CtrlQuestion } = require('../controllers');
const router = Router();

router.get('/question', CtrlQuestion.questionPage);
router.get('/question/add', CtrlQuestion.addQuestionPage);
router.post('/question/add', CtrlQuestion.addQuestion);

router.get('/questions', CtrlQuestion.indexPage);
router.get('/questions/:id', CtrlQuestion.showPage);
router.get('/questions/edit/:id', CtrlQuestion.editPage);
router.patch('/questions/edit/:id', CtrlQuestion.editQuestion);
router.get('/questions/delete/:id', CtrlQuestion.deleteQuestion);

module.exports = router;
