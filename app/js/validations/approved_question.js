window.addEventListener('load', validateApprovedQuestionForm);

function apiApprovedQuestion() {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        approved: true,
    };
    const body = new URLSearchParams(data).toString();
    const id = document.getElementById('id-approved').textContent;
    API.patch(`/questions/edit/${id}`, body, header)
        .then((result) => {
          consoel.log(result.status);
            if (result.status === 204) {
                window.location.href = "/questions";
            } else {
                result.json()
                    .then((res) => {
                        msgErrVal('msg-alert-question-approved', res.body.error);
                    });
            }
        });
  }

function validateApprovedQuestionForm() {
    try {
        const btn = document.getElementById('approved-question');
        btn.addEventListener('click', apiApprovedQuestion);
    } catch (error) {
    }
}
