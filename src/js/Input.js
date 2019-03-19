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
            Speak(State.description);
            break;
        case 'help':
        case 'h':
            Speak(`Possible commands are: <span class="underlined-text">${State.commands.join('</span>, <span class="underlined-text">')}</span>.`);
            break;
        case 'clear':
        case 'reset':
            answers.innerHTML = '';
            Speak(State.description);
            break;
        case 'quit':
        case 'q':
        case 'exit':
            Speak('Actually, you there is now where go to.');
            break;

        // Actions

        case 'stand':
            if (State.place.name === 'meadow' && State.mode === 'laying') {
                setState({
                    mode: 'standing',
                    commands: ['woods', 'lie', 'describe']
                });

                Speak('You stand up.');
            } else {
                Speak("Aren't you standing already?");
            }

            break;
        case 'lie':
        case 'lay':
            if (State.place.name === 'meadow' && State.mode === 'standing') {
                setState({
                    mode: 'laying',
                    commands: ['woods', 'stand', 'describe']
                });

                Speak('You lie down for a while...');
            } else {
                Speak('You cannot lie down here...');
            }

            break;
        case 'talk':
        case 'speak':
            if (State.place.name === 'woods') {
                Shake();
                Speak('You begin to speak, and suddently you feel the ground moving...');
            } else {
                Speak('Are you talking to yourself?');
            }

            break;
        case 'drink':
            if (State.place.name === 'lake') {
                Speak('The water tastes like minerals. You should probably not drink too much of this?');
            } else {
                Speak("There isn't any water here...");
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
