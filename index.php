<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz</title>
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
<main>
    <section class="stepper">
        <span class="step step-1 active"></span>
        <span class="step step-2"></span>
        <span class="step step-3"></span>
    </section>
    <section id="app" class="app">
        <div class="information">
            <div>
                <p id="engagement">
                    1. You have only 30 seconds per each question.<br>
                    2. Once you select your answer, you can't reselect.<br>
                    3. You can't select any option once time goes off.<br>
                    4. You can't exit from the quiz while you're playing.<br>
                    5. You'll get points on the basis of your correct answers.<br>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A asperiores aspernatur at consequatur, dolore doloremque,
                    eos expedita illum ipsum magnam molestias mollitia nesciunt
                    numquam quaerat quis saepe sequi tenetur vel.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A asperiores aspernatur at consequatur, dolore doloremque,
                    eos expedita illum ipsum magnam molestias mollitia nesciunt
                    numquam quaerat quis saepe sequi tenetur vel.
                </p>
            </div>
            <div>
                <input id="checkbox1" type="checkbox" class="checkbox pointer">
                <label for="checkbox1" class="normal pointer">Accept Terms and Conditions</label>
            </div>
            <div>
                <button id="btn-start-quiz">Start Quiz</button>
            </div>
        </div>
        <div class="questions none">
            <div class="questions_header">
                <div class="questions_header_top">
                    <h5>Question <span id="question_number">1</span></h5>
                    <h5>
                        <svg>
                            <circle r="22" cx="25" cy="25"></circle>
                            <circle id="circle_timer" r="22" cx="25" cy="25"></circle>
                        </svg>
                        <span id="timer">30</span>
                    </h5>
                </div>
                <div class="questions_header_progress">

                </div>
            </div>
            <div class="questions_item">
                <div class="questions_item_title">
                </div>
                <div class="questions_item_answers">
                </div>
            </div>
            <div class="questions_footer">
                <button id="btn-next-question">Next Question</button>
                <button id="btn-finish" class="none">Finish</button>
            </div>
        </div>
        <div class="result none">
            <div class="result_header">
                <div>
                    <div class="result_header_correct">
                        <div id="correct">10</div>
                        correct
                    </div>
                    <div class="result_header_incorrect">
                        <div id="incorrect">10</div>
                        incorrect
                    </div>
                </div>
                <div>
                    <button id="btn-play-again">Play Again</button>
                </div>
            </div>
            <div class="result_review">
                <h3>Review Questions</h3>
                <div id="review_questions">
                </div>
            </div>
        </div>
    </section>
</main>
<script src="assets/js/script.js"></script>
</body>
</html>