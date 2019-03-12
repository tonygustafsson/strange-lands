import Typed from 'typed.js';
import Speak from './Speak';
import State from './State';

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

    function shake() {
        body.className = 'shake';

        setTimeout(function() {
            body.className = '';
        }, 2000);
    }

    document.addEventListener('DOMContentLoaded', function() {
        Speak('Whe...^500 where am I? Am I... ^750 laying down?!');

        var soundFile = 'sounds/music.mp3';
        var backgroundMusic = new Audio(soundFile);

        backgroundMusic.addEventListener('loadeddata', function() {
            backgroundMusic.loop = true;
            backgroundMusic.play();
        });
    });

    document.addEventListener('click', function() {
        input.focus();
    });

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function changeBackground(place) {
        blackOverlay.className = 'overlay black visible';

        setTimeout(function() {
            body.style.backgroundImage = 'url("img/' + place + '.jpg")';
            blackOverlay.className = 'overlay black';
        }, 1000);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (input.value == 'hello' || input.value == 'hi') {
            Speak('Hello young sir.');
        } else if (input.value == 'describe' || input.value == 'd') {
            Speak(State.description);
        } else if (input.value == 'stand' && State.action == 'laying') {
            State.action = 'standing';

            changeBackground('meadow-standing');

            Speak('You stand up.');
        } else if (input.value == 'meadow' && State.place == 'forest') {
            State.place = 'meadow';
            State.description =
                'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.';
            State.commands = ['forest', 'description'];

            changeBackground('meadow-standing');

            Speak(State.description);
        } else if (input.value == 'forest' && State.place == 'meadow' && State.action !== 'laying') {
            State.place = 'forest';
            State.description = "You are now in a dark forrest. Are you sure that's wise at this hour?";
            State.commands = ['meadow', 'talk', 'description'];

            changeBackground('forest');

            Speak(State.description);
        } else if (input.value == 'talk' && State.place == 'forest') {
            shake();
            Speak('You begin to speak, and suddently you feel the ground moving...');
        } else if (input.value == 'clear') {
            answers.innerHTML = '';
        } else if (input.value == 'help' || input.value == 'commands') {
            var commands = '';

            for (var i in State.commands) {
                commands += '<li>' + State.commands[i] + '</li>';
            }

            Speak('Possible commands are:<br><ul>' + commands + '</ul>');
        } else if (input.value == 'quit' || input.value == 'exit') {
            Speak('Actually, you there is now where go to.');
        } else if (input.value == 'ok' || input.value == 'OK') {
            Speak('...');
        } else {
            var randomAnswer = Math.floor(Math.random() * 3 + 1);

            switch (randomAnswer) {
                case 1:
                    Speak("Excuse me? Type 'help' if you need to.");
                    break;
                case 2:
                    Speak("Come again, please? Type 'help' if you need to.");
                    break;
                case 3:
                    Speak("Command is unknown. Type 'help' if you need to.");
                    break;
            }
        }

        input.value = '';
        input.focus();
    });
})();
