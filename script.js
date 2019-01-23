(function game() {
    'use strict';

    var input = document.getElementById('input'),
        form = document.getElementById('footer-form'),
        answers = document.getElementById('answers'),
        body = document.getElementById('body'),
        blackOverlay = document.getElementById('blackOverlay'),
        answerId = 0;

    input.focus();

    var state = {
        place: 'meadow',
        description: 'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.',
        commands: ['stand', 'forest', 'describe'],
        action: 'laying'
    };

    (function stayOnBottom() {
        answers.scrollTop = answers.scrollHeight + 1000;

        setTimeout(stayOnBottom, 100);
    })();

    function say(html) {
        var oldestParagraph = document.getElementById('answer-' + (answerId - 50));
        if (oldestParagraph) answers.removeChild(oldestParagraph);

        var delay = Math.floor(Math.random() * 750 + 1);

        var soundFile = 'sounds/answer' + Math.floor(Math.random() * 3 + 1) + '.mp3';
        var audio = new Audio(soundFile);

        setTimeout(function() {
            audio.play();
        }, delay);

        var newParagraph = document.createElement('p');
        newParagraph.id = 'answer-' + answerId;
        answers.appendChild(newParagraph);

        Typed.new('#answer-' + answerId, {
            strings: [html],
            typeSpeed: 0,
            startDelay: delay,
            showCursor: false,
            contentType: 'html'
        });

        answerId++;
    }

    function shake() {
        body.className = 'shake';

        setTimeout(function() {
            body.className = '';
        }, 2000);
    }

    document.addEventListener('DOMContentLoaded', function() {
        say('Whe...^500 where am I? Am I... ^750 laying down?!');

        var soundFile = 'sounds/music.mp3';
        var audio = new Audio(soundFile);
        audio.loop = true;
        audio.play();
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
            say('Hello young sir.');
        } else if (input.value == 'describe' || input.value == 'd') {
            say(state.description);
        } else if (input.value == 'stand' && state.action == 'laying') {
            state.action = 'standing';

            changeBackground('meadow-standing');

            say('You stand up.');
        } else if (input.value == 'meadow' && state.place == 'forest') {
            state.place = 'meadow';
            state.description =
                'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.';
            state.commands = ['forest', 'description'];

            changeBackground('meadow-standing');

            say(state.description);
        } else if (input.value == 'forest' && state.place == 'meadow') {
            state.place = 'forest';
            state.description = "You are now in a dark forrest. Are you sure that's wise at this hour?";
            state.commands = ['meadow', 'talk', 'description'];

            changeBackground('forest');

            say(state.description);
        } else if (input.value == 'talk' && state.place == 'forest') {
            shake();
            say('You begin to speak, and suddently you feel the ground moving...');
        } else if (input.value == 'clear') {
            answers.innerHTML = '';
        } else if (input.value == 'help' || input.value == 'commands') {
            var commands = '';

            for (var i in state.commands) {
                commands += '<li>' + state.commands[i] + '</li>';
            }

            say('Possible commands are:<br><ul>' + commands + '</ul>');
        } else if (input.value == 'quit' || input.value == 'exit') {
            say('Actually, you there is now where go to.');
        } else if (input.value == 'ok' || input.value == 'OK') {
            say('...');
        } else {
            var randomAnswer = Math.floor(Math.random() * 3 + 1);

            switch (randomAnswer) {
                case 1:
                    say("Excuse me? Type 'help' if you need to.");
                    break;
                case 2:
                    say("Come again, please? Type 'help' if you need to.");
                    break;
                case 3:
                    say("Command is unknown. Type 'help' if you need to.");
                    break;
            }
        }

        input.value = '';
        input.focus();
    });
})();
