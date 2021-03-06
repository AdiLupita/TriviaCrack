const { Router } = require('express');
const { CtrlUser } = require('../controllers');
const router = Router();

router.post('/login', CtrlUser.login);
router.post('/register', CtrlUser.register);
router.get('/logout', CtrlUser.logout);
router.get('/profile', CtrlUser.profilePage);
router.post('/profile/friends', CtrlUser.addFriend);
router.delete('/profile/friends', CtrlUser.removeFriend);
router.get('/profile/edit', CtrlUser.profileEditPage);
router.patch('/profile/edit', CtrlUser.profileUpdate);

router.get('/profile/add_emails', CtrlUser.addEmailsPage);
router.post('/profile/add_emails', CtrlUser.addEmail);
router.delete('/profile/add_emails', CtrlUser.removeEmail);

router.get('/users', CtrlUser.indexPage);
router.get('/users/:nickname', CtrlUser.showPage);
router.get('/users/edit/:nickname', CtrlUser.editPage);
router.patch('/users/edit/:nickname', CtrlUser.editUser);
router.delete('/users/delete/:nickname', CtrlUser.deleteUser);

module.exports = router;
