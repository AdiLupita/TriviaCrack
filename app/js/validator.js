const MSG_INVAL_NICKNAME = 'Not valid nickname';
const MSG_INVAL_PASSWORD = 'Not valid password';
const MSG_INVAL_EMAIL = 'Not valid email format';
const MSG_INVAL_WORD = 'Not valid word';
const MSG_INVAL_TEXT = 'Not valid text';
const MSG_INVAL_FILE = 'Not valid file extension';
const MSG_INVAL_ID = 'Not valid id';

function invalidInput(node) {
    node.classList.add('incorrect');
}

function validInput(node) {
    node.classList.remove('incorrect');
}

function msgErrVal(id, msg) {
    document.getElementById(id).classList.add('alert-show');
    document.getElementById(id).innerHTML = msg;
}

function msgErrValHide(id) {
    document.getElementById(id).classList.remove('alert-show');
}

const VALITATIONS = {
    id: /^[0-9]+$/,
    nickname: /^[a-zA-Z][\w]{2,}$/,
    word: /[a-zA-ZñÑ ]{3,}/,
    text: /[\wñÑ #@$%?()]{3,}/,
    password: /^[\wñÑ#@$%]{5,}$/,
    file: /^[\w]+\.(png|jpg)$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

function valId(data) {
    return (VALITATIONS.id.test(data))
}

function valNickname(data) {
    return (VALITATIONS.nickname.test(data))
}

function valWord(data) {
    return (VALITATIONS.word.test(data))
}

function valText(data) {
    return (VALITATIONS.text.test(data))
}

function valPassword(data) {
    return (VALITATIONS.password.test(data))
}

function valFile(data) {
    return (VALITATIONS.file.test(data))
}

function valEmail(data) {
    return (VALITATIONS.email.test(data))
}

window.addEventListener('load', validateLoginForm);

function apiLogin(nick, pass) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = { nickname: nick, password: pass };
    const body = new URLSearchParams(data).toString();
    API.post('/login', body, header)
        .then((res) => {
            if (res.status === 200) {
                window.location = res.url;
            } else {
                res.json().then((msg) => {
                    msgErrVal('msg-alert-log', msg.body.data);
                });
            }
        })
}

function valInputLogin() {
    const formLogin = document.getElementById('form-login');
    const nicknameInput = formLogin.elements.namedItem('nickname');
    const passwordInput = formLogin.elements.namedItem('password');
    let correct = true;
    const msg = [];
    if (!valNickname(nicknameInput.value)) {
        invalidInput(nicknameInput);
        msg.push(MSG_INVAL_NICKNAME);
        correct = false;
    } else {
        validInput(nicknameInput);
    }
    if (!valPassword(passwordInput.value)) {
        invalidInput(passwordInput);
        msg.push(MSG_INVAL_PASSWORD);
        correct = false;
    } else {
        validInput(passwordInput);
    }
    if (correct) {
        msgErrValHide('msg-alert-log');
        apiLogin(nicknameInput.value, passwordInput.value);
    } else {
        msgErrVal('msg-alert-log', msg.join(', '));
    }
}

function validateLoginForm() {
    try {
        const btnLogin = document.getElementById('btn-login');
        btnLogin.addEventListener('click', valInputLogin);
    } catch (error) {

    }
}

window.addEventListener('load', leaveSession);

function apiLogout() {
    API.get('/logout')
        .then((res) => {
            if (res.status === 200) {
                window.location = res.url;
            } else {
                res.json().then((msg) => {
                    window.alert(msg.body.data)
                });
            }
        });

}

function leaveSession() {
    try {
        const btn = document.getElementById('btn-logout');
        btn.addEventListener('click', apiLogout);
    } catch (error) {
    }
}


window.addEventListener('load', validateRegForm);

function apiRegister(nick, email, pass) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        nickname: nick,
        password: pass,
        email,
    };
    const body = new URLSearchParams(data).toString()
    API.post('/register', body, header)
        .then((res) => {
            if (res.status === 200) {
                window.location = res.url;
            } else {
                res.json().then((msg) => {
                    const field = msg.body.data;
                    if (field.indexOf('nickname') > -1) {
                        msgErrVal('msg-alert-reg', field);
                        invalidInput(document.getElementById('new-nickname'));
                    }
                    if (field.indexOf('email') > -1) {
                        msgErrVal('msg-alert-reg', field);
                        invalidInput(document.getElementById('new-email'));
                    }
                });
            }
        });
}

function validateRegData() {
    const inptNick = document.getElementById('new-nickname');
    const inptEmail = document.getElementById('new-email');
    const inptPass = document.getElementById('new-password');
    let correct = true;
    const msg = []
    if (!valNickname(inptNick.value)) {
        invalidInput(inptNick);
        correct = false;
        msg.push(MSG_INVAL_NICKNAME);
    } else {
        validInput(inptNick);
    }
    if (!valEmail(inptEmail.value)) {
        invalidInput(inptEmail);
        correct = false;
        msg.push(MSG_INVAL_EMAIL);
    } else {
        validInput(inptEmail);
    }
    if (!valPassword(inptPass.value)) {
        invalidInput(inptPass);
        correct = false;
        msg.push(MSG_INVAL_PASSWORD);
    } else {
        validInput(inptPass);
    }
    if (correct) {
        msgErrValHide('msg-alert-reg');
        apiRegister(inptNick.value, inptEmail.value, inptPass.value);
    } else {
        msgErrVal('msg-alert-reg', msg.join(', '));
    }
}

function validateRegForm() {
    try {
        const btn = document.getElementById('btn-register');
        btn.addEventListener('click', validateRegData);
    } catch (error) {
    }
}

window.addEventListener('load', validateAddEmailForm);

function apiAddEmail(email) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        email,
    };
    const body = new URLSearchParams(data).toString()
    API.post('/profile/add_emails', body, header)
        .then((res) => {
            res.json()
                .then((r) => {
                    if (r.statusCode === 200) {
                        const newDiv = document.createElement('div')
                        newDiv.innerHTML = r.body;
                        const newForm = newDiv.children[0];
                        const btn = newForm.getElementsByClassName('btn-icon')[0];
                        document.getElementById('list-emails').appendChild(newForm);
                        btn.addEventListener('click', validateRemoveEmailForms);
                        document.getElementById('inp-add-email').value = '';
                    } else {
                        msgErrVal('msg-alert-email', r.body.data);
                        invalidInput(document.getElementById('inp-add-email'));
                    }

                });
        });
}

function validateAddEmailData() {
    const inpAdd = document.getElementById('inp-add-email');
    let correct = true;
    let msg = '';
    if (!valEmail(inpAdd.value)) {
        invalidInput(inpAdd);
        correct = false;
        msg = MSG_INVAL_EMAIL;
    } else {
        validInput(inpAdd);
    }
    if (correct) {
        apiAddEmail(inpAdd.value);
        msgErrValHide('msg-alert-email');
    } else {
        msgErrVal('msg-alert-email', msg);
    }
}

function validateAddEmailForm() {
    try {
        const btnAdd = document.getElementById('btn-add-email');
        btnAdd.addEventListener('click', validateAddEmailData);
    } catch (error) {
    }
}

window.addEventListener('load', validateRemoveEmailForms);

function apiRemoveEmail() {
    var parent = this.parentNode;
    var supParen = parent.parentNode;
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        email: parent.children[0].value,
    };
    const body = new URLSearchParams(data).toString()
    API.delete('/profile/add_emails', body, header)
        .then((res) => {
            if (res.status === 204) {
                supParen.removeChild(parent);
            } else {
                window.alert('something unexpected happened');
            }
        })

}

function validateRemoveEmailForms() {
    try {
        const listBtns = document.getElementsByClassName('email-list');
        const buttons = listBtns.getElementsByClassName('btn-icon');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', apiRemoveEmail);
        }
    } catch (error) {
    }
}

window.addEventListener('load', validateAddQuestionForm);

function apiAddQuestion(category, question, opc1, opc2, opcC) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        category,
        question,
        option1: opc1,
        option2: opc2,
        optioncorrect: opcC,
    };
    const body = new URLSearchParams(data).toString()
    API.post('/question/add', body, header)
        .then((res) => {
            if (res.status === 200) {
                document.getElementById('form-add-question').reset();
            } else {
                res.json()
                    .then((r) => {
                        msgErrVal('msg-alert-question', r.body.data);
                    });
            }
        });
}

function validateAddQuestionData() {
    const slcCategory = document.getElementById('slc-category');
    const txtArea = document.getElementById('txt-a-question');
    const inpOpc1 = document.getElementById('inp-opcion-1');
    const inpOpc2 = document.getElementById('inp-opcion-2');
    const inpOpcC = document.getElementById('inp-opcion-c');
    var correct = true;
    const msg = [];
    if (!valId(slcCategory.value)) {
        invalidInput(slcCategory);
        correct = false;
        msg.push('Invalid category');
    } else {
        validInput(slcCategory);
    }
    if (!valText(txtArea.value)) {
        invalidInput(txtArea);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in question`);
    } else {
        validInput(txtArea);
    }
    if (!valText(inpOpc1.value)) {
        invalidInput(inpOpc1);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in option 1`);
    } else {
        validInput(inpOpc1);
    }
    if (!valText(inpOpc2.value)) {
        invalidInput(inpOpc2);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in option 2`);
    } else {
        validInput(inpOpc2);
    }
    if (!valText(inpOpcC.value)) {
        invalidInput(inpOpcC);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in option correct`);
    } else {
        validInput(inpOpcC);
    }
    if (correct) {
        apiAddQuestion(slcCategory.value, txtArea.value,
            inpOpc1.value, inpOpc2.value, inpOpcC.value);
        msgErrValHide('msg-alert-question');
    } else {
        msgErrVal('msg-alert-question', msg.join(', '));
    }
}

function validateAddQuestionForm() {
    try {
        const btn = document.getElementById('btn-add-question');
        btn.addEventListener('click', validateAddQuestionData);
    } catch (error) {
    }
}

window.addEventListener('load', validateAddFriendsForm);

function apiAddFriend(friend) {

}

function validateAddFriendsData() {
    console.log('validando');
}

function validateAddFriendsForm() {
    const btn = document.getElementById('btn-add-friend');
    btn.addEventListener('click', validateAddFriendsData);
}
