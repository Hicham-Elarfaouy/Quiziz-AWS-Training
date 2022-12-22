// selectors
const r = document.querySelector(':root');
const APP = document.querySelector('#app');
const BTN_QUIZ = document.querySelector('#btn-start-quiz');
const CHECKBOX_ACCEPT = document.querySelector('#checkbox1');

// check if accept our conditions before start
BTN_QUIZ.disabled = true;
CHECKBOX_ACCEPT.onclick = () => {
    BTN_QUIZ.disabled = !CHECKBOX_ACCEPT.checked;
}

// when click start quiz move to next step in stepper and show questions page
BTN_QUIZ.onclick = () => {
    r.style.setProperty('--width-stepper', '50%');
    document.querySelector('.step-2').classList.add('active');
    APP.querySelector('.information').classList.add('none');
    APP.querySelector('.questions').classList.remove('none');
}

// function agree() {
//     r.style.setProperty('--width-stepper', '50%');
//     document.querySelector('.step-2').classList.add('active');
// }

// function agre() {
//     r.style.setProperty('--width-stepper', '100%');
//     document.querySelector('.step-3').classList.add('active');
// }