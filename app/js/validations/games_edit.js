window.addEventListener('load', validateEditGameForm);

function apiEditGame(fields, id) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const body = new URLSearchParams(fields).toString();
    API.patch(`/games/edit/${id}`, body, header)
        .then((result) => {
            if (result.status === 204) {
                window.location.reload();
            } else {
                result.json()
                    .then((res) => {
                        msgErrVal('msg-alert-game-edit', res.body.error);
                    });
            }
        });
  }

function validateEditGameData() {
    const score1 = document.getElementById('score1-edit');
    const score2 = document.getElementById('score2-edit');
    var correct = true;
    const msg = [];
    if (!valId(score1.value)) {
        invalidInput(score1);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in score 1`);
    } else {
        validInput(score1);
    }
    if (!valId(score2.value)) {
        invalidInput(score2);
        correct = false;
        msg.push(`${MSG_INVAL_TEXT} in score 2`);
    } else {
        validInput(score2);
    }
    if (correct) {let modified = false;
        msgErrValHide('msg-alert-game-edit');
        const fields = {};
        if (score1.getAttribute('data-origin-val') !== score1.value) {
            fields.scoreplayer1 = score1.value;
            modified = true;
        }
        if (score2.getAttribute('data-origin-val') !== score2.value) {
            fields.scoreplayer2 = score2.value;
            modified = true;
        }
        if (modified) {
            const id = document.getElementById('id-item-game');
            apiEditGame(fields, id.textContent);
        }else{
            msgErrVal('msg-alert-game-edit', 'No data modified.');
        }
    } else {
        msgErrVal('msg-alert-game-edit', msg.join(', '));
    }
}

function validateEditGameForm() {
    try {
        const btn = document.getElementById('btn-game-edit');
        btn.addEventListener('click', validateEditGameData);
    } catch (error) {
    }
}
