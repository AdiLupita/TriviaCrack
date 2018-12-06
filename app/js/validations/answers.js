const MSG_COR_ANSWER = 'Answer correct';
const MSG_ERR_ANSWER = 'Answer incorrect';

window.addEventListener('load', answerQuestion);

function dissableBtnsQuestion() {
    const question = document.getElementById('answer-options');
    const options = question.getElementsByTagName('button');
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }
}

function showResultAnswer(result) {
    const container = document.getElementById('msg-result-answer');
    if (result) {
        container.classList.add('answer-cor');
        container.innerHTML = MSG_COR_ANSWER;

    } else {
        container.classList.add('answer-err');
        container.innerHTML = MSG_ERR_ANSWER;
    }
}

function nextViewGame(num) {
    if (num < 10) {
        document.getElementById('btn-next-quest').classList.add('ans-flow-show');
    } else {
        document.getElementById('btn-finish-game').classList.add('ans-flow-show');
    }
}

function apiAnswer() {
    console.log('asda');
    const option = this.value;
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        option,
    };
    const body = new URLSearchParams(data).toString()
    API.post('/answer', body, header)
        .then((res) => {
            res.json()
                .then((r) => {
                    console.log(r);
                    const num = r.body.data.ansNumber;
                    const correct = r.body.data.correct;
                    showResultAnswer(correct);
                    nextViewGame(num);
                    dissableBtnsQuestion();
                });
        });
}

function answerQuestion() {
    try {
        const question = document.getElementById('answer-options');
        const options = question.getElementsByTagName('button');
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener('click', apiAnswer);
        }
    } catch (error) {

    }
}
