export const InitBackgroundSound = () => {
    let soundFile = 'sounds/music.mp3';
    let backgroundMusic = new Audio(soundFile);

    backgroundMusic.addEventListener('loadeddata', function() {
        backgroundMusic.loop = true;
        backgroundMusic.play();
    });
};

export const MakeAnswerSound = () => {
    let soundFile = 'sounds/answer' + Math.floor(Math.random() * 3 + 1) + '.mp3';
    let answerSound = new Audio(soundFile);

    answerSound.addEventListener('loadeddata', function() {
        answerSound.play();
    });
};
