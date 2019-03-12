import Typed from 'typed.js';

let answersBox = document.getElementById('answers'),
    answerId = 0,
    maxAnswers = 10;

function Speak(htmlString) {
    let oldestParagraph = document.getElementById('answer-' + (answerId - maxAnswers));
    if (oldestParagraph) answersBox.removeChild(oldestParagraph);

    let delay = Math.floor(Math.random() * 750 + 1);

    let soundFile = 'sounds/answer' + Math.floor(Math.random() * 3 + 1) + '.mp3';
    let answerSound = new Audio(soundFile);

    answerSound.addEventListener('loadeddata', function() {
        setTimeout(function() {
            answerSound.play();
        }, delay);
    });

    let newParagraph = document.createElement('p');
    newParagraph.id = 'answer-' + answerId;
    answersBox.appendChild(newParagraph);

    new Typed('#answer-' + answerId, {
        strings: [htmlString],
        typeSpeed: 20,
        startDelay: delay,
        showCursor: false,
        contentType: 'html'
    });

    answerId++;
}

export default Speak;
