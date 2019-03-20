import { ChangeBackground } from './Background';
import { Places } from './Places';

const localStorageKey = 'gameState';

const initState = {
    place: Places.meadow,
    mode: 'laying'
};

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

    if (changes.mode) {
        newState.mode = changes.mode;
    }

    if (newState.place.name !== State.place.name || newState.mode !== State.mode) {
        ChangeBackground(newState.place.name, newState.mode);
    }

    saveStateToLocalStorage(newState);
    console.log('New state', newState);

    State = newState;
};

const localStorageState = getStateFromLocalStorage();
export let State = localStorageState ? localStorageState : initState;

ChangeBackground(State.place.name, State.mode);
