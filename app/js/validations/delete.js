window.addEventListener('click', loadingDelete);

function loadingDelete() {
    try {
        const deleteElement = document.getElementById('delete');
        deleteElement.addEventListener('click', apiRemoveFriend);
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
