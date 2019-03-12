const body = document.getElementById('body'),
    blackOverlay = document.getElementById('blackOverlay');

export const ChangeBackground = place => {
    blackOverlay.className = 'overlay black visible';

    setTimeout(function() {
        body.style.backgroundImage = 'url("img/' + place + '.jpg")';
        blackOverlay.className = 'overlay black';
    }, 1000);
};

export const Shake = () => {
    body.className = 'shake';

    setTimeout(function() {
        body.className = '';
    }, 2000);
};
