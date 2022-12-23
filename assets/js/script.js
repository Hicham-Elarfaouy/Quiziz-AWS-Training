// global variables
let index = 0;
let question_length = 0;
let questions_id = [];

// selectors
const r = document.querySelector(':root');
const APP = document.querySelector('#app');
const BTN_QUIZ = document.querySelector('#btn-start-quiz');
const BTN_NEXT = document.querySelector('#btn-next-question');
const BTN_FINISH = document.querySelector('#btn-finish');
const CHECKBOX_ACCEPT = document.querySelector('#checkbox1');
const QUESTION_TITLE = document.querySelector('.questions_item_title');
const QUESTION_ANSWERS = document.querySelector('.questions_item_answers');
const QUESTION_NUMBER = document.querySelector('#question_number');

// check if accept our conditions before start
BTN_QUIZ.disabled = true;
CHECKBOX_ACCEPT.onclick = () => {
    BTN_QUIZ.disabled = !CHECKBOX_ACCEPT.checked;
}

// when click start quiz move to next step in stepper and show questions page
BTN_QUIZ.onclick = () => {
    next_question();
    r.style.setProperty('--width-stepper', '50%');
    document.querySelector('.step-2').classList.add('active');
    APP.querySelector('.information').classList.add('none');
    APP.querySelector('.questions').classList.remove('none');
}

BTN_FINISH.onclick = () =>{
    r.style.setProperty('--width-stepper', '100%');
    document.querySelector('.step-3').classList.add('active');
    APP.querySelector('.questions').classList.add('none');
    // APP.querySelector('.questions').classList.remove('none');
}

// get length and id of questions
get_question().then((data)=>{
    data.forEach((e)=>{
        questions_id.push(e.id);
    });
    questions_id = questions_id.sort(function () {
        return Math.random() - 0.5;
    });
    question_length = data.length;
});

// function for get specific question from json file
async function get_question(id = ''){
    return await fetch(`http://localhost:3000/questions/${id}`).then((response)=>{
        return response.json();
    });
}

function update_progress(){
    let val = ((index+1) / question_length) * 100;
    r.style.setProperty('--width-progress', `${val}%`);
}

function create_option(O){
    let id = `radio${O['id']}`;
    let option = document.createElement('div');
    let input = document.createElement('input');
    input.id = id;
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'answer');
    let label = document.createElement('label');
    label.setAttribute('for', `${id}`);
    label.append(O['option']);
    option.append(input, label);
    return option;
}
function next_question(){
    update_progress();
    QUESTION_NUMBER.textContent = (index + 1).toString();
    get_question(questions_id[index]).then((Q)=>{
        QUESTION_TITLE.textContent = Q['question'];
        QUESTION_ANSWERS.innerHTML = '';
        for (let i = 0; i < Q['options'].length; i++){
            QUESTION_ANSWERS.appendChild(create_option(Q['options'][i]));
        }
    });
    index++;
    if(index >= question_length){
        BTN_NEXT.classList.add('none');
        BTN_FINISH.classList.remove('none');
        index = 0;
    }
}