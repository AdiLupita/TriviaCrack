window.addEventListener('load', validateEditUserForm);

function apiEditUser(fields) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = { ...fields };
    const body = new URLSearchParams(data).toString()
    API.patch('/users/edit/', body, header)
        .then((result) => {
            if (result.status === 204) {
                window.location.reload();
            } else {
                result.json()
                    .then((res) => {
                        msgErrVal('msg-alert-edit-user', res.body.error);
                    });
            }
        });
}

function validateEditProfileData() {
    const inpEmail = document.getElementById('inp-new-email');
    const inpPass = document.getElementById('inp-new-pass');
    const inpFile = document.getElementById('inp-file-avatar');
    let correct = true;
    const msg = [];
    if (!valEmail(inpEmail.value)) {
        invalidInput(inpEmail);
        msg.push(MSG_INVAL_EMAIL);
        correct = false;
    } else {
        validInput(inpEmail);
    }
    if (!valPassword(inpPass.value)) {
        invalidInput(inpPass);
        msg.push(MSG_INVAL_PASSWORD);
        correct = false;
    } else {
        validInput(inpPass);
    }
    if (inpFile.files[0]) {
        if (!valFile(inpFile.files[0].name)) {
            invalidInput(inpFile);
            msg.push(MSG_INVAL_FILE);
            correct = false;
        } else {
            validInput(inpFile);
        }
    }
    if (correct) {
        let modified = false;
        msgErrValHide('msg-alert-edit-user');
        const fields = {};
        if (inpEmail.getAttribute('data-origin-val') !== inpEmail.value) {
            fields.email = inpEmail.value;
            modified = true;
        }
        if (inpPass.getAttribute('data-origin-val') !== inpPass.value) {
            fields.password = inpPass.value;
            modified = true;
        }
        if (modified) {
            apiEditProfile(fields);
        }else{
            msgErrVal('msg-alert-edit-user', 'No data modified.');
        }
    } else {
        msgErrVal('msg-alert-edit-user', msg.join(', '));
    }
}

function validateEditUserForm() {
    try {
        const btn = document.getElementById('btn-edit-user');
        btn.addEventListener('click', validateEditUserData);
    } catch (error) {
    }
}
