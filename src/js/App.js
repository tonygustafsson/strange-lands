import Speak from './Speak';
import State from './State';
import Input from './Input';
import { InitBackgroundSound } from './Sound';

const InitGame = () => {
    var input = document.getElementById('input'),
        form = document.getElementById('footer-form'),
        answers = document.getElementById('answers');

    input.focus();

    (function stayOnBottom() {
        answers.scrollTop = answers.scrollHeight + 1000;

        setTimeout(stayOnBottom, 100);
    })();

    document.addEventListener('DOMContentLoaded', function() {
        Speak('Whe...^500 where am I? Am I... ^750 laying down?!');

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
