document.addEventListener('DOMContentLoaded', ()=>{
    const gameInfo = document.querySelector("[data-game-info]");
    const guessBtn = document.querySelector("[data-action-btn]");
    const settingsSection = document.querySelector("[data-container]");
    const numberInput = document.querySelector("[data-input-number]");
    const maxNumberInput = document.querySelector("[data-input-max-number]");
    const settingsBtn = document.querySelector("[data-settings-btn]");

    let maxNumber = 100;
    let secretNumber = Math.floor(Math.random()*maxNumber) + 1;
    let attempts = 0;

    function toggleSettings() {
        settingsSection.classList.toggle('show');
        settingsSection.classList.toggle('fade-in');
    }

    function updateMaxNumber() {
        const newMax = parseInt(maxNumberInput.value);
        if (newMax > 1) {
            maxNumber = newMax;
            secretNumber = Math.floor(Math.random()*maxNumber) + 1;
            gameInfo.textContent = `Угадай число между 1 и ${maxNumber}`;
            toggleSettings();
        } else {
            alert('Пожалуйста, введи число больше 1.');
        }
    }

    function checkGuess() {
        const guess = parseInt(numberInput.value);

        if (isNaN(guess) || guess < 1 || guess > maxNumber) {
            alert(`Пожалуйста, введи число между 1 и ${maxNumber}`);
            return;
        }

        attempts++;

        if (guess === secretNumber) {
            gameInfo.textContent = `Поздравляю, ты угадал число за ${attempts} попыток!`;
            guessBtn.disabled = true;
        } else if (guess < secretNumber) {
            gameInfo.textContent = "Мало! Бери выше.";
        } else {
            gameInfo.textContent = "Много! Бери ниже.";
        }

        numberInput.value = '';
        numberInput.focus();
    }

     // Обработчики событий
    settingsBtn.addEventListener('click', updateMaxNumber);
    guessBtn.addEventListener('click', checkGuess);
    numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });

    // Показываем кнопку настроек
    const settingsToggle = document.createElement('button');
    settingsToggle.textContent = '⚙️ Settings';
    settingsToggle.className = 'action-btn';
    settingsToggle.addEventListener('click', toggleSettings);
    document.querySelector('.guess-section').appendChild(settingsToggle);
});
