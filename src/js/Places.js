import { State, setState } from './State';

export const Places = {
    meadow: {
        name: 'meadow',
        description: 'You feel green grass under you bare foots. You seem to be on some kind of meadow. No one is around, and nature makes almost no sounds.',
        commands: ['stand', 'describe'],
        availablePlaces: ['woods'],
        availableActions: {
            lie: {
                description: 'You lie down for a while...',
                mode: 'laying'
            },
            stand: {
                description: 'You stand up and stretch your legs.',
                mode: 'standing'
            }
        },
        objects: {
            stars: {
                description: 'You get carried away when you look at the clear sky. All those small balls of gas. You feel so so small.'
            },
            trees: {
                description: "You see a forrest line ahead of you. It's kind of dark so maybe you should wait on going there until tomorrow?"
            }
        }
    },
    woods: {
        name: 'woods',
        description: "You are now in a dark forrest. Are you sure that's wise at this hour?",
        commands: ['meadow', 'lake', 'talk', 'describe'],
        modeRequired: 'standing',
        availablePlaces: ['meadow', 'lake'],
        availableActions: {
            speak: {
                description: 'You begin to speak, and suddently you feel the ground moving...',
                mode: 'standing'
            }
        },
        objects: {
            tree: {
                description: 'This tree looks weird... can you push those panels?'
            },
            sky: {
                description: 'The sky is dim at this hour and kind of greenish.'
            },
            ground: {
                description: "The ground is moist and mushy. But it's fine if you follow the trail."
            }
        }
    },
    lake: {
        name: 'lake',
        description: 'You arrive to a calm lake. You hear nothing but a crow somewhere far away and trees whizzing.',
        commands: ['woods', 'drink', 'describe'],
        availablePlaces: ['woods'],
        availableActions: {
            drink: {
                description: 'The water tastes like minerals. You should probably not drink too much of this?',
                mode: 'standing'
            }
        },
        objects: {
            water: {
                description: 'The water is calm. Too calm... you see a fish making rings too your right.'
            },
            sky: {
                description: 'The sky is eerie and the clouds are too many to count. The sun is going down to your left.'
            },
            shore: {
                description: "It's to dark to see the other shore..."
            }
        }
    }
};

export const GoTo = placeString => {
    let place = Places[placeString];

    if (place === null) {
        return false;
    }

    if (!State.place.availablePlaces.includes(place.name)) {
        return false;
    }

    if (Object.hasOwnProperty.call(place, 'modeRequired') && place.modeRequired !== State.mode) {
        return false;
    }

    setState({
        place: place
    });

    return true;
};

export const DoAction = actionString => {
    let action = Object.hasOwnProperty.call(State.place.availableActions, actionString) ? State.place.availableActions[actionString] : null;

    if (action === null) {
        return false;
    }

    if (action.mode) {
        setState({
            mode: action.mode
        });
    }

    return action.description;
};

export const GetObjectDescription = object => {
    if (typeof object === 'undefined') {
        // Describe the place, not an object
        return State.place.description;
    }

    let obj = Object.hasOwnProperty.call(State.place.objects, object) ? State.place.objects[object] : null;

    if (obj === null) {
        return 'You cannot see ' + object + ' here.';
    }

    return obj.description;
};
