const { Router } = require('express');
const { CtrlUser } = require('../controllers');
const router = Router();

router.post('/login', CtrlUser.login);
router.post('/register', CtrlUser.register);
router.get('/logout', CtrlUser.logout);
router.get('/profile', CtrlUser.profilePage);
router.post('/profile', function(req, res){
    res.send('Not implemented')
});
router.get('/profile/edit', CtrlUser.profileEditPage);
router.get('/profile/add_emails', CtrlUser.addEmailsPage);

router.get('/users', CtrlUser.indexPage);
router.get('/users/:nickname', CtrlUser.showPage);
router.get('/users/edit/:nickname', CtrlUser.editPage);
router.delete('/users/delete/:nickname', CtrlUser.deleteUser);

module.exports = router;
