import State from './State';
import Speak from './Speak';
import { ChangeBackground, Shake } from './Background';

const Input = said => {
    said = said.trim().toLowerCase();
    console.log(said);

    if (said == 'hello' || said == 'hi') {
        Speak('Hello young sir.');
    } else if (said == 'describe' || said == 'd') {
        Speak(State.description);
    } else if (said == 'stand' && State.action == 'laying') {
        State.action = 'standing';
        State.commands = ['forest', 'describe'];

        ChangeBackground('meadow-standing');

        Speak('You stand up.');
    } else if (said == 'meadow' && State.place == 'forest') {
        State.place = 'meadow';
        State.description =
            'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.';
        State.commands = ['forest', 'description'];

        ChangeBackground('meadow-standing');

        Speak(State.description);
    } else if (said == 'forest' && State.place == 'meadow' && State.action !== 'laying') {
        State.place = 'forest';
        State.description = "You are now in a dark forrest. Are you sure that's wise at this hour?";
        State.commands = ['meadow', 'talk', 'description'];

        ChangeBackground('forest');

        Speak(State.description);
    } else if (said == 'talk' && State.place == 'forest') {
        Shake();
        Speak('You begin to speak, and suddently you feel the ground moving...');
    } else if (said == 'clear') {
        answers.innerHTML = '';
    } else if (said == 'help' || said == 'commands') {
        var commands = '';

        for (var i in State.commands) {
            commands += '<li>' + State.commands[i] + '</li>';
        }

        Speak('Possible commands are:<br><ul>' + commands + '</ul>');
    } else if (said == 'quit' || said == 'exit') {
        Speak('Actually, you there is now where go to.');
    } else if (said == 'ok' || said == 'OK') {
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
};

export default Input;
