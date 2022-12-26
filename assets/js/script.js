// global variables
let index = 0;
let questions_length = 0;
let questions_id = [];
let QUESTION;
let user_answers = [];

// selectors
const r = document.querySelector(':root');
const APP = document.querySelector('#app');
const BTN_QUIZ = document.querySelector('#btn-start-quiz');
const BTN_NEXT = document.querySelector('#btn-next-question');
const BTN_FINISH = document.querySelector('#btn-finish');
const BTN_AGAIN = document.querySelector('#btn-play-again');
const CHECKBOX_ACCEPT = document.querySelector('#checkbox1');
const QUESTION_TITLE = document.querySelector('.questions_item_title');
const QUESTION_ANSWERS = document.querySelector('.questions_item_answers');
const QUESTION_NUMBER = document.querySelector('#question_number');
const RESULT_CORRECT = document.querySelector('#correct');
const RESULT_INCORRECT = document.querySelector('#incorrect');
const REVIEW_QUESTIONS = document.querySelector('#review_questions');

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

BTN_NEXT.onclick = () => {
    check_answers();
    next_question();
}

BTN_FINISH.onclick = () => {
    check_answers();
    r.style.setProperty('--width-stepper', '100%');
    document.querySelector('.step-3').classList.add('active');
    APP.querySelector('.questions').classList.add('none');
    APP.querySelector('.result').classList.remove('none');
    update_result();
}

BTN_AGAIN.onclick = () => {
    location.reload();
}

// get length and id of questions
get_question().then((data) => {
    data.forEach((e) => {
        questions_id.push(e.id);
    });
    questions_id = questions_id.sort(function () {
        return Math.random() - 0.5;
    });
    questions_length = data.length;
});

// function for get specific question from json file
async function get_question(id = '') {
    return await fetch(`http://localhost:3000/questions/${id}`).then((response) => {
        return response.json();
    });
}

function update_progress() {
    let val = ((index + 1) / questions_length) * 100;
    r.style.setProperty('--width-progress', `${val}%`);
}

function create_option(O) {
    let id = `option${O['id']}`;
    let option = document.createElement('div');
    let input = document.createElement('input');
    input.id = id;

    if (QUESTION['answers'].length > 1) {
        input.setAttribute('type', 'checkbox');
    } else {
        input.setAttribute('type', 'radio');
    }

    input.setAttribute('name', 'answer');
    let label = document.createElement('label');
    label.setAttribute('for', `${id}`);
    label.append(O['option']);
    option.append(input, label);
    return option;
}

function next_question() {
    update_progress();
    QUESTION_NUMBER.textContent = (index + 1).toString();
    get_question(questions_id[index]).then((Q) => {
        QUESTION = Q;
        QUESTION_TITLE.textContent = Q['question'];
        QUESTION_ANSWERS.innerHTML = '';
        for (let i = 0; i < Q['options'].length; i++) {
            QUESTION_ANSWERS.appendChild(create_option(Q['options'][i]));
        }
    });
    index++;
    if (index >= questions_length) {
        BTN_NEXT.classList.add('none');
        BTN_FINISH.classList.remove('none');
        index = 0;
    }
}

function check_answers() {
    let answers_checked = [];
    let answers_right = [];

    for (let i = 0; i < QUESTION['answers'].length; i++) {
        answers_right.push(QUESTION['answers'][i]);
    }
    for (let i = 1; i <= 4; i++) {
        if (document.querySelector(`#option${i}`).checked) {
            answers_checked.push(i);
        }
    }
    let user_answer = {
        "id": QUESTION['id'],
        "status": false,
        "user_checked": answers_checked
    }
    if (answers_right.toString() === answers_checked.toString()) {
        user_answer.status = true;
    }
    user_answers.push(user_answer);
}

function create_options_review_question(options, right, checked) {
    let section = document.createElement('section');
    for (let i = 0; i < options.length; i++) {
        let div = document.createElement('div');
        div.append(options[i]['option']);
        if (checked.includes(options[i]['id'])) {
            div.classList.add('user_answer');
            if (!right.includes(options[i]['id'])) {
                div.classList.add('wrong_answer');
            }
        }
        if (right.includes(options[i]['id'])) {
            div.classList.add('right_answer');
        }
        section.append(div);
    }
    return section;
}

function create_review_question(item) {
    let question_div = document.createElement('div');
    question_div.classList.add('result_review_question');

    let title_div = document.createElement('div');
    title_div.classList.add('result_review_question_title');

    let options_div = document.createElement('div');
    options_div.classList.add('result_review_question_options');

    get_question(item['id']).then((Q) => {
        title_div.append(Q['question']);

        options_div.append(create_options_review_question(Q['options'], Q['answers'], item['user_checked']));

        if (item['status'] === true) {
            question_div.classList.add('correct_question');
        } else {
            question_div.classList.add('incorrect_question');
            let explanation = document.createElement('p');
            let title_ex = document.createElement('b');
            title_ex.append('Explanation : ');
            explanation.append(title_ex, Q['explanation']);
            options_div.append(explanation);
        }
    });

    question_div.append(title_div, options_div);

    return question_div;
}

function update_result() {
    let user = user_answers.sort((a, b) => {
        return (a["status"] < b['status']) ? -1 : 1;
    });
    RESULT_CORRECT.textContent = user.filter(q => q['status'] === true).length.toString();
    RESULT_INCORRECT.textContent = user.filter(q => q['status'] === false).length.toString();
    REVIEW_QUESTIONS.innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        REVIEW_QUESTIONS.append(create_review_question(user[i]));
    }
}