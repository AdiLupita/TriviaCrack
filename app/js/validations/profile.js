window.addEventListener('load', validateEditProfileForm);


function apiEditProfile() {
    console.log('Edit profile not implemented');
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
        msgErrValHide('msg-alert-edit-profile');
        apiEditProfile();
    } else {
        msgErrVal('msg-alert-edit-profile', msg.join(', '));
    }
}

function validateEditProfileForm() {
    try {
        const btn = document.getElementById('btn-edit-profile');
        btn.addEventListener('click', validateEditProfileData);
    } catch (error) {

    }
}
