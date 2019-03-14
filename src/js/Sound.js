const getRandomSoundFile = () => {
    let randomSound = Math.floor(Math.random() * 3) + 1;
    let soundFile = `sounds/music${randomSound}.mp3`;

    return soundFile;
};

export const InitBackgroundSound = () => {
    let soundFile = getRandomSoundFile();
    let backgroundMusic = new Audio(soundFile);

    backgroundMusic.addEventListener('loadeddata', () => {
        backgroundMusic.play();
    });

    backgroundMusic.addEventListener('ended', () => {
        let soundFile = getRandomSoundFile();
        backgroundMusic.src = soundFile;
        backgroundMusic.load();
    });
};

export const MakeAnswerSound = () => {
    let soundFile = 'sounds/answer' + Math.floor(Math.random() * 3 + 1) + '.mp3';
    let answerSound = new Audio(soundFile);

    answerSound.addEventListener('loadeddata', function() {
        answerSound.play();
    });
};

document.querySelector('.js-sound-toggler').addEventListener('click', () => {
    InitBackgroundSound();
    document.querySelector('.js-sound-toggler').style.display = 'none';
});
