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
                    // const field = msg.body.data;
                    // if (field.indexOf('nickname') > -1) {
                    //     msgErrVal('msg-alert-reg', field);
                    //     invalidInput(document.getElementById('new-nickname'));
                    // }
                    // if (field.indexOf('email') > -1) {
                    //     msgErrVal('msg-alert-reg', field);
                    //     invalidInput(document.getElementById('new-email'));
                    // }
                    msgErrVal('msg-alert-reg', 'This user/email already exist.');
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