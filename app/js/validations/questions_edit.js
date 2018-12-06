window.addEventListener('load', validateEditQuestionForm);

function apiEditQuestion(category, question, opc1, opc2, opcC, id) {
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
    const body = new URLSearchParams(data).toString();
    API.patch(`/questions/edit/${id}`, body, header)
        .then((result) => {
            if (result.status === 204) {
                window.location.reload();
            } else {
                result.json()
                    .then((res) => {
                        msgErrVal('msg-alert-question-edit', res.body.error);
                    });
            }
        });
  }

function validateEditQuestionData() {
    const slcCategory = document.getElementById('category-edit');
    const txtArea = document.getElementById('question-edit');
    const inpOpc1 = document.getElementById('opcion-1-edit');
    const inpOpc2 = document.getElementById('opcion-2-edit');
    const inpOpcC = document.getElementById('opcion-c-edit');
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
        const id = document.getElementById('id-item-question');
        apiEditQuestion(slcCategory.value, txtArea.value,
            inpOpc1.value, inpOpc2.value, inpOpcC.value, id.textContent);
        msgErrValHide('msg-alert-question-edit');
    } else {
        msgErrVal('msg-alert-question-edit', msg.join(', '));
    }
}

function validateEditQuestionForm() {
    try {
        const btn = document.getElementById('btn-question-edit');
        btn.addEventListener('click', validateEditQuestionData);
    } catch (error) {
    }
}
