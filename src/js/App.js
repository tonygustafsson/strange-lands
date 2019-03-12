import Speak from './Speak';
import State from './State';
import Input from './Input';
import { InitBackgroundSound } from './Sound';

(function game() {
    'use strict';

    var input = document.getElementById('input'),
        form = document.getElementById('footer-form'),
        answers = document.getElementById('answers'),
        body = document.getElementById('body'),
        blackOverlay = document.getElementById('blackOverlay');

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

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        Input(input.value);

        input.value = '';
        input.focus();
    });
})();
