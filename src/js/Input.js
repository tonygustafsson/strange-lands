import { State, setState, clearLocalStorage } from './State';
import Speak from './Speak';
import { Shake } from './Background';

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
            if (State.place === 'meadow' && State.mode === 'laying') {
                setState({
                    mode: 'standing',
                    commands: ['forest', 'lie', 'describe']
                });

                Speak('You stand up.');
            } else {
                Speak("Aren't you standing already?");
            }

            break;
        case 'lie':
        case 'lay':
            if (State.place === 'meadow' && State.mode === 'standing') {
                setState({
                    mode: 'laying',
                    commands: ['forest', 'stand', 'describe']
                });

                Speak('You lie down for a while...');
            } else {
                Speak('You cannot lie down here...');
            }

            break;
        case 'talk':
        case 'speak':
            if (State.place === 'forest') {
                Shake();
                Speak('You begin to speak, and suddently you feel the ground moving...');
            } else {
                Speak('Are you talking to yourself?');
            }

            break;
        case 'drink':
            if (State.place === 'lake') {
                Speak('The water tastes like minerals. You should probably not drink too much of this?');
            } else {
                Speak("There isn't any water here...");
            }

            break;

        // Change place

        case 'meadow':
            if (State.place === 'forest') {
                setState({
                    place: 'meadow',
                    description:
                        'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.',
                    commands: ['forest', 'lie', 'describe']
                });

                Speak(State.description);
            } else {
                Speak('You cannot go to the meadow from here.');
            }

            break;
        case 'forest':
        case 'forrest':
        case 'woods':
            if ((State.place === 'meadow' || State.place === 'lake') && State.mode === 'standing') {
                setState({
                    place: 'forest',
                    description: "You are now in a dark forrest. Are you sure that's wise at this hour?",
                    commands: ['meadow', 'lake', 'talk', 'describe']
                });

                Speak(State.description);
            } else {
                Speak('You cannot go to the forest from here.');
            }

            break;
        case 'lake':
            if (State.place === 'forest') {
                setState({
                    place: 'lake',
                    description: 'You arrive to a calm lake. You hear nothing but a crow somewhere far away and trees whizzing.',
                    commands: ['forest', 'drink', 'describe']
                });

                Speak(State.description);
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
