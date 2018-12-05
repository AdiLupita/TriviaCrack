const MSG_INVAL_NICKNAME = 'Not valid nickname';
const MSG_INVAL_PASSWORD = 'Not valid password';
const MSG_INVAL_EMAIL = 'Not valid email format';
const MSG_INVAL_WORD = 'Not valid word';
const MSG_INVAL_TEXT = 'Not valid text';
const MSG_INVAL_FILE = 'Not valid file extension';
const MSG_INVAL_ID = 'Not valid id';

function invalidInput(node) {
    node.classList.add('incorrect');
}

function validInput(node) {
    node.classList.remove('incorrect');
}

function msgErrVal(id, msg) {
    document.getElementById(id).classList.add('alert-show');
    document.getElementById(id).innerHTML = msg;
}

function msgErrValHide(id) {
    document.getElementById(id).classList.remove('alert-show');
}

const VALITATIONS = {
    id: /^[0-9]+$/,
    nickname: /^[a-zA-Z][\w]{2,}$/,
    word: /[a-zA-ZñÑ ]{3,}/,
    text: /[\wñÑ #@$%?()]{3,}/,
    password: /^[\wñÑ#@$%]{5,}$/,
    file: /^[\w]+\.(png|jpg|jpeg)$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

function valId(data) {
    return (VALITATIONS.id.test(data))
}

function valNickname(data) {
    return (VALITATIONS.nickname.test(data))
}

function valWord(data) {
    return (VALITATIONS.word.test(data))
}

function valText(data) {
    return (VALITATIONS.text.test(data))
}

function valPassword(data) {
    return (VALITATIONS.password.test(data))
}

function valFile(data) {
    return (VALITATIONS.file.test(data))
}

function valEmail(data) {
    return (VALITATIONS.email.test(data))
}

