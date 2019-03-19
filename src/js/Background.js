const body = document.getElementById('body'),
    blackOverlay = document.getElementById('blackOverlay');

export const ChangeBackground = (place, mode) => {
    blackOverlay.className = 'overlay black visible';

    setTimeout(function() {
        body.style.backgroundImage = 'url("img/' + place.name + '-' + mode + '.jpg")';
        blackOverlay.className = 'overlay black';
    }, 500);
};

export const Shake = () => {
    body.className = 'shake';

    setTimeout(function() {
        body.className = '';
    }, 2000);
};
