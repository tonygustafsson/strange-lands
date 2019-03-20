import { State, setState, clearLocalStorage } from './State';
import Speak from './Speak';
import { Shake } from './Background';
import { Place, GoTo, DoAction } from './Places';

const Input = said => {
    said = said.trim().toLowerCase();

    switch (said) {
        // Global basics

        case 'hello':
        case 'hi':
            Speak('Hello young sir.');
            break;
        case 'describe':
        case 'description':
        case 'd':
            Speak(State.place.description);
            break;
        case 'help':
        case 'h':
            Speak(
                `Possible commands are: <span class="underlined-text">${State.commands.join(
                    '</span>, <span class="underlined-text">'
                )}</span>.`
            );
            break;
        case 'clear':
        case 'reset':
            answers.innerHTML = '';
            Speak(State.place.description);
            break;
        case 'quit':
        case 'q':
        case 'exit':
            Speak('Actually, you there is now where go to.');
            break;

        // Actions

        case 'stand':
            let standAction = DoAction('stand');
            if (standAction) {
                Speak(standAction);
            } else {
                Speak('You cannot stand up here.?');
            }

            break;
        case 'lie':
        case 'lay':
            let lieAction = DoAction('lie');
            if (lieAction) {
                Speak(lieAction);
            } else {
                Speak('You cannot lie down here...');
            }

            break;
        case 'talk':
        case 'speak':
            let speakAction = DoAction('speak');
            if (speakAction) {
                Shake();
                Speak(speakAction);
            } else {
                Speak('Are you talking to yourself?');
            }

            break;
        case 'drink':
            let drinkAction = DoAction('drink');
            if (drinkAction) {
                Speak(drinkAction);
            } else {
                Speak("There aren't any water here...");
            }

            break;

        // Change place

        case 'meadow':
            if (GoTo('meadow')) {
                Speak(State.place.description);
            } else {
                Speak('You cannot go to the meadow from here.');
            }

            break;
        case 'forest':
        case 'forrest':
        case 'woods':
            if (GoTo('woods')) {
                Speak(State.place.description);
            } else {
                Speak('You cannot go to the woods from here.');
            }

            break;
        case 'lake':
            if (GoTo('lake')) {
                Speak(State.place.description);
            } else {
                Speak('Do you see any lake anywhere?!');
            }

            break;

        // Don't know what to do

        default:
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
};

export default Input;
