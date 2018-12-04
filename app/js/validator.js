function invalidInput(node) {
    node.classList.add('incorrect');
}

function validInput(node) {
    node.classList.remove('incorrect');
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
                    window.alert(msg.body.data)
                });
            }
        })
}

function valInputLogin() {
    const formLogin = document.getElementById('form-login');
    const nicknameInput = formLogin.elements.namedItem('nickname');
    const passwordInput = formLogin.elements.namedItem('password');
    let correct = true;
    if (!valNickname(nicknameInput.value)) {
        invalidInput(nicknameInput);
        correct = false;
    } else {
        validInput(nicknameInput);
    }
    if (!valNickname(passwordInput.value)) {
        invalidInput(passwordInput);
        correct = false;
    } else {
        validInput(passwordInput);
    }
    if (correct) {
        apiLogin(nicknameInput.value, passwordInput.value);
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
                        invalidInput(document.getElementById('new-nickname'));
                    }
                    if (field.indexOf('email') > -1) {
                        invalidInput(document.getElementById('new-email'));
                    }

                    window.alert(field);
                });
            }
        });
}

function validateRegData() {
    const inptNick = document.getElementById('new-nickname');
    const inptEmail = document.getElementById('new-email');
    const inptPass = document.getElementById('new-password');
    let correct = true;
    if (!valNickname(inptNick.value)) {
        invalidInput(inptNick);
        correct = false;
    } else {
        validInput(inptNick);
    }
    if (!valEmail(inptEmail.value)) {
        invalidInput(inptEmail);
        correct = false;
    } else {
        validInput(inptEmail);
    }
    if (!valPassword(inptPass.value)) {
        invalidInput(inptPass);
        correct = false;
    } else {
        validInput(inptPass);
    }
    if (correct) {
        apiRegister(inptNick.value, inptEmail.value, inptPass.value);
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
            if (res.status === 200) {
                res.json()
                    .then((r) => {
                        const newDiv = document.createElement('div')
                        newDiv.innerHTML = r.body;
                        const newForm = newDiv.children[0];
                        document.getElementById('list-emails').appendChild(newForm);
                        document.getElementById('inp-add-email').value = '';
                    })
            } else {
                invalidInput(document.getElementById('inp-add-email'));
            }
        });
}

function validateAddEmailData() {
    const inpAdd = document.getElementById('inp-add-email');
    let correct = true;
    if (!valEmail(inpAdd.value)) {
        invalidInput(inpAdd);
        correct = false;
    } else {
        validInput(inpAdd);
    }
    if (correct) {
        // console.log('piu');
        apiAddEmail(inpAdd.value);
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
        const buttons = document.getElementsByClassName('btn-icon');
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
                window.alert('Question created');
                document.getElementById('form-add-question').reset();
            } else {
                res.json()
                    .then((r) => {
                        invalidInput(document.getElementById('txt-a-question'));
                        window.alert(r.body.data);
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
    if (!valId(slcCategory.value)) {
        invalidInput(slcCategory);
        correct = false;
    } else {
        validInput(slcCategory);
    }
    if (!valText(txtArea.value)) {
        invalidInput(txtArea);
        correct = false;
    } else {
        validInput(txtArea);
    }
    if (!valText(inpOpc1.value)) {
        invalidInput(inpOpc1);
        correct = false;
    } else {
        validInput(inpOpc1);
    }
    if (!valText(inpOpc2.value)) {
        invalidInput(inpOpc2);
        correct = false;
    } else {
        validInput(inpOpc2);
    }
    if (!valText(inpOpcC.value)) {
        invalidInput(inpOpcC);
        correct = false;
    } else {
        validInput(inpOpcC);
    }
    if (correct) {
        apiAddQuestion(slcCategory.value, txtArea.value,
            inpOpc1.value, inpOpc2.value, inpOpcC.value);
    }
}

function validateAddQuestionForm() {
    try {
        const btn = document.getElementById('btn-add-question');
        btn.addEventListener('click', validateAddQuestionData);
    } catch (error) {
    }
}
