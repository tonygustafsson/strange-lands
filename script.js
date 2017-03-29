(function game() {
    "use strict";

    var input = document.getElementById('input'),
        form = document.getElementById('footer-form'),
        answers = document.getElementById('answers'),
        body = document.getElementById('body'),
        blackOverlay = document.getElementById('blackOverlay'),
        answerId = 0,
        state = null;

    input.focus();

    (function stayOnBottom() {
        answers.scrollTop = answers.scrollHeight + 1000;

        setTimeout(stayOnBottom, 100);
    })();

    function say(html) {
        var oldestParagraph = document.getElementById('answer-' + (answerId - 50));
        if (oldestParagraph) answers.removeChild(oldestParagraph);

        var delay = Math.floor((Math.random() * 750) + 1);

        var soundFile = 'sounds/answer' + (Math.floor((Math.random() * 3) + 1)) + '.mp3';
        var audio = new Audio(soundFile);

        setTimeout(function () {
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

        setTimeout(function () {
            body.className = '';
        }, 1000);
    }

	document.addEventListener("DOMContentLoaded", function (){
		say('Hello. Type \'help\' you need to.');

        var soundFile = 'sounds/music.mp3';
        var audio = new Audio(soundFile);
        audio.loop = true;
        audio.play();
	});

    document.addEventListener('click', function () {
        if (Math.floor((Math.random() * 5) + 1) === 1) {
            say('No touchy!!');
        }
        
        input.focus();
    });

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function travel(place) {
        blackOverlay.className = "overlay black visible";

        setTimeout(function () {
            body.style.backgroundImage = 'url("img/background' + place + '.jpg")';
            blackOverlay.className = "overlay black";
        }, 1000);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (input.value == 'hello' || input.value == 'hi') {
            say('Hello young sir.');
        }
        else if (input.value.match(/(who|what)(.*)am(.*)i/i)) {
            say('I don\'t know who you are.');
        }
        else if (input.value.match(/(who|what)(.*)are(.*)you/i)) {
            say('I think I am your assistant.');
        }
        else if (input.value.match(/(where)(.*)(are|am)(.*)(we|you|i)/i)) {
            say('We seem to be in deep space.');
        }
        else if (input.value.match(/(what)(.*)(time|clock)/i) || input.value == 'time') {
            say('The current time is ' + new Date());
        }
        else if (input.value.match(/(show)(.*)(me)/i)) {
            say('<img src="img/earth.png" width="200" height="200">');
        }
        else if (input.value == 'shake') {
            shake();
        }
        else if (input.value == 'menu') {
            state = 'menu';
            say('Who are you?<br>[0] Robot<br>[1] Human<br>[2] Other animal');
        }
        else if (input.value == 'clear') {
            answers.innerHTML = '';
        }
        else if (input.value == 'travel') {
            say('Where do you wanna go then?<br>[0] Deep space<br>[1] Not so deep space');
            state = 'travel';
        }
        else if (input.value == 'help') {
            say('Possible commands are:<br><ul><li>hello</li><li>travel</li><li>shake</li><li>clear</li><li>menu</li><li>Who are you?</li><li>Who am I?</li><li>Where are we?</li><li>time</li><li>Show me earth</li></ul>');
        }
        else if (state == 'travel' && isNumeric(input.value)) {
            switch (input.value) {
                case "0":
                    say('Buckle up, Betty...');
                    travel(0);
                    break;
                case "1":
                    say('Awesome. Let\'s go...');
                    travel(1);
                    break;
                default:
                    say('Walla go where!?');
            }

            state = null;
        }
        else if (state == 'menu' && isNumeric(input.value)) {
            switch (input.value) {
                case "0":
                    say('Hmm, you don\'t act like a fellow robot...');
                    break;
                case "1":
                    say('I figured...');
                    break;
                case "2":
                    say('I\'m just glad you are not a human :)');
                    break;
                default:
                    say('Are you stupid or something?');
            }

            state = null;
        }
        else if (input.value == 'quit' || input.value == 'exit') {
            say('Actually, you seem to be stuck in space where with me.');
        }
        else if (input.value == 'ok' || input.value == 'OK') {
            say('...');
        }
        else {
            var randomAnswer = Math.floor((Math.random() * 3) + 1);

            switch (randomAnswer) {
                case 1:
                    say('Excuse me?');
                    break;
                case 2:
                    say('Come again, please?');
                    break;
                case 3: 
                    say('What are you trying to do?');
                    break;
            }
        }

        input.value = '';
        input.focus();
    });
})();