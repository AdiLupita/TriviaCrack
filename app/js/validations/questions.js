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
