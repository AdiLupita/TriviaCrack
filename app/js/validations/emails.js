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
                        msgErrVal('msg-alert-email', r.body.error);
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

window.addEventListener('load', pagAddEmailForm);

function loadAddEmailPage() {
    console.log('click', this.value);
    window.location = `/profile/add_emails?page=${this.value}`;
}

function pagAddEmailForm() {
    try {
        const form = document.getElementById('pag-emails');
        const btns = form.getElementsByTagName('button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', loadAddEmailPage);
        }
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
                msgErrVal('msg-alert-email', 'Something unexpected happened');
            }
        })

}

function validateRemoveEmailForms() {
    try {
        const buttons = document.getElementsByName('btn-rm-email');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', apiRemoveEmail);
        }
    } catch (error) {
    }
}
