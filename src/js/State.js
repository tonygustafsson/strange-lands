import { ChangeBackground } from './Background';

const localStorageKey = 'gameState';

const initState = {
    place: 'meadow',
    description: 'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.',
    commands: ['stand', 'describe'],
    mode: 'laying'
};

export const availablePlaces = ['meadow', 'forest'];

export const availableModes = ['standing', 'laying'];

export const availableCommands = ['forest', 'meadow', 'stand', 'lie', 'describe', 'talk'];

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

    if (changes.place && availablePlaces.includes(changes.place)) {
        newState.place = changes.place;
    }

    if (changes.description) {
        newState.description = changes.description;
    }

    if (changes.commands) {
        let commandsAreOk = changes.commands.every(c => availableCommands.includes(c));

        if (commandsAreOk) {
            console.log('New commands', changes.commands);
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
