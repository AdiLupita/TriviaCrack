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
                msgErrVal('msg-alert-log', 'User/password combination is not valid');
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