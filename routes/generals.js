const { Router } = require('express');
const { CtrlGeneral } = require('../controllers');
const router = Router();

router.get('/', CtrlGeneral.indexPage);
router.get('*', CtrlGeneral.notFoundPage);

module.exports = router;
