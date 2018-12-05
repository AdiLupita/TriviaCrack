window.addEventListener('load', validateAddFriendsForm);

function apiAddFriend(friend) {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        friend,
    };
    const body = new URLSearchParams(data).toString()
    API.post('/profile/friends', body, header)
        .then((res) => {
            res.json()
                .then((r) => {
                    if (r.statusCode === 200) {
                        const auxUl = document.createElement('ul');
                        auxUl.innerHTML = r.body;
                        const li = auxUl.children[0];
                        document.getElementById('list-friends').appendChild(li);
                        const btns = li.getElementsByClassName('btn-icon');
                        btns[0].addEventListener('click', apiPlay);
                        btns[1].addEventListener('click', apiRemoveFriend);
                        document.getElementById('inp-nick-friend').value = '';
                    } else {
                        msgErrVal('msg-alert-add-friend', r.body.error);
                        invalidInput(document.getElementById('inp-add-email'));
                    }

                });
        });
}

function validateAddFriendsData() {
    const inpFriend = document.getElementById('inp-nick-friend');
    let correct = true;
    let msg = '';
    if (!valNickname(inpFriend.value)) {
        invalidInput(inpFriend);
        msg = MSG_INVAL_NICKNAME;
        correct = false;
    } else {
        validInput(inpFriend);
    }
    if (correct) {
        msgErrValHide('msg-alert-add-friend');
        apiAddFriend(inpFriend.value);
    } else {
        msgErrVal('msg-alert-add-friend', msg);
    }
}

function validateAddFriendsForm() {
    try {
        const btn = document.getElementById('btn-add-friend');
        btn.addEventListener('click', validateAddFriendsData);
    } catch (error) {
    }
}

window.addEventListener('load', validatePlayForm);

function apiRemoveFriend() {
    var parent = this.parentNode;
    var li = parent.parentNode.parentNode;
    var ul = document.getElementById('list-friends');
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    const data = {
        friend: this.value,
    };
    const body = new URLSearchParams(data).toString()
    API.delete('/profile/friends', body, header)
        .then((res) => {
            if (res.status === 204) {
                ul.removeChild(li);
                msgErrValHide('msg-alert-rm-friend');
            } else {
                msgErrVal('msg-alert-rm-friend', 'Something unexpected happened');
            }
        });
}

function apiPlay() {
    console.log(this.value);
    console.log('play not implemented');
}

function validatePlayForm() {
    try {
        const btnsPlay = document.getElementsByName('btn-play-friend');
        const btnsRemove = document.getElementsByName('btn-rm-friend');
        for (let i = 0; i < btnsPlay.length; i++) {
            btnsPlay[i].addEventListener('click', apiPlay);
            btnsRemove[i].addEventListener('click', apiRemoveFriend);
        }
    } catch (error) {
    }
}
