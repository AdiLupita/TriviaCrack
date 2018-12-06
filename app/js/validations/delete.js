windows.addEventListener('click', loadingDelete);

function loadingDelete() {
    try {
        const del = document.getElementById('delete');
        del.addEventListener('click', apiRemoveFriend);
    }
    catch(e) {}
}

function apiRemoveFriend() {
    const header = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    API.delete('/users/${nickname}', null, header)
        .then((res) => {
            if (res.status === 204) {
                msgErrValHide('msg-alert-rm-delete');
            } else {
                msgErrVal('msg-alert-rm-delete', 'Something unexpected happened');
            }
        });
}
