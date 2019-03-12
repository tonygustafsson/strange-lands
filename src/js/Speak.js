import Typed from 'typed.js';
import { MakeAnswerSound } from './Sound';

let answersBox = document.getElementById('answers'),
    answerId = 0,
    maxAnswers = 10;

function Speak(htmlString) {
    let oldestParagraph = document.getElementById('answer-' + (answerId - maxAnswers));
    if (oldestParagraph) answersBox.removeChild(oldestParagraph);

    let delay = Math.floor(Math.random() * 750 + 1);

    MakeAnswerSound();

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
