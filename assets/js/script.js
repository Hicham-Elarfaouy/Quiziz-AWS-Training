let r = document.querySelector(':root');

function agree() {
    r.style.setProperty('--width-stepper', '50%');
    document.querySelector('.step-2').classList.add('active');
}

function agre() {
    r.style.setProperty('--width-stepper', '100%');
    document.querySelector('.step-3').classList.add('active');
}