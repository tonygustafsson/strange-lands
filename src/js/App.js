import Speak from './Speak';
import { State } from './State';
import Input from './Input';
import { InitBackgroundSound } from './Sound';
import '../scss/app.scss';

const InitGame = () => {
    var input = document.getElementsByClassName('js-user-input')[0],
        form = document.getElementsByClassName('js-user-form')[0],
        answers = document.getElementsByClassName('answers')[0];

    input.focus();

    (function stayOnBottom() {
        answers.scrollTop = answers.scrollHeight + 1000;

        setTimeout(stayOnBottom, 100);
    })();

    document.addEventListener('DOMContentLoaded', function() {
        if (State.action && State.action === 'laying') {
            Speak('Whe...^500 where am I? Am I... ^750 laying down?!');
        } else {
            Speak(State.description);
        }

        InitBackgroundSound();
    });

    document.addEventListener('click', function() {
        input.focus();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        Input(input.value);

        input.value = '';
        input.focus();
    });
};

InitGame();
