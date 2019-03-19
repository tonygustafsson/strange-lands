import { ChangeBackground } from './Background';
import { Places } from './Places';

const localStorageKey = 'gameState';

const initState = {
    place: Places.meadow,
    description: 'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.',
    commands: ['stand', 'describe'],
    mode: 'laying'
};

export const availableModes = ['standing', 'laying'];

export const availableCommands = ['woods', 'meadow', 'lake', 'stand', 'lie', 'describe', 'talk', 'drink'];

const saveStateToLocalStorage = state => {
    const base64String = btoa(JSON.stringify(state));
    window.localStorage.setItem(localStorageKey, base64String);
};

const clearLocalStorage = () => {
    window.localStorage.removeItem(localStorageKey);
};

const getStateFromLocalStorage = () => {
    const base64String = window.localStorage.getItem(localStorageKey);

    if (base64String) {
        const decodedString = atob(base64String);
        const jsonState = JSON.parse(decodedString);

        return jsonState;
    }

    return false;
};

export const setState = changes => {
    let newState = { ...State };

    if (changes.place && State.place.availablePlaces.includes(changes.place.name)) {
        newState.place = changes.place;
    }

    if (changes.description) {
        newState.description = changes.description;
    }

    if (changes.commands) {
        let commandsAreOk = changes.commands.every(c => availableCommands.includes(c));

        if (commandsAreOk) {
            newState.commands = changes.commands;
        }
    }

    if (changes.mode && availableModes.includes(changes.mode)) {
        newState.mode = changes.mode;
    }

    if (newState.place !== State.place || newState.mode !== State.mode) {
        ChangeBackground(newState.place, newState.mode);
    }

    saveStateToLocalStorage(newState);
    console.log('New state', newState);

    State = newState;
};

const localStorageState = getStateFromLocalStorage();
export let State = localStorageState ? localStorageState : initState;

ChangeBackground(State.place, State.mode);
