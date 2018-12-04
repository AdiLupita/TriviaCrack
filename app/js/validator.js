function invalitInput(node) {
    node.classList.add('incorrect');
}

function valitInput(node) {
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
        invalitInput(nicknameInput);
        correct = false;
    } else {
        valitInput(nicknameInput);
    }
    if (!valNickname(passwordInput.value)) {
        invalitInput(passwordInput);
        correct = false;
    } else {
        valitInput(passwordInput);
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
                        invalitInput(document.getElementById('new-nickname'));
                    }
                    if (field.indexOf('email') > -1) {
                        invalitInput(document.getElementById('new-email'));
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
        invalitInput(inptNick);
        correct = false;
    } else {
        valitInput(inptNick);
    }
    if (!valEmail(inptEmail.value)) {
        invalitInput(inptEmail);
        correct = false;
    } else {
        valitInput(inptEmail);
    }
    if (!valPassword(inptPass.value)) {
        invalitInput(inptPass);
        correct = false;
    } else {
        valitInput(inptPass);
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
                invalitInput(document.getElementById('inp-add-email'));
            }
        });
}

function validateAddEmailData() {
    const inpAdd = document.getElementById('inp-add-email');
    let correct = true;
    if (!valEmail(inpAdd.value)) {
        invalitInput(inpAdd);
        correct = false;
    } else {
        valitInput(inpAdd);
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
    const buttons = document.getElementsByClassName('btn-icon');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', apiRemoveEmail);
    }
}