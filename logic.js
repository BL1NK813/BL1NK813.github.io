document.addEventListener('DOMContentLoaded', function() {
    const dotsElement = document.getElementById('dots');
    let dotCount = 0;

    const changeDots = () => {
        dotCount = (dotCount + 1) % 4;
        dotsElement.textContent = '.'.repeat(dotCount);
    };

    const intervalId = setInterval(changeDots, 500);

    setTimeout(function() {
        clearInterval(intervalId);
        document.getElementById('progress_few').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 000);
});

let energyTap = 500; /*Энергия*/
const energyTapMax = 500; /*Макс энергия*/
const energyTapDecrement = 100; /*Сколько энергии отнимается*/
let coinsProgress = 0; /*Хз че это*/
const coinsIncrement = 3; /*Сколько монет прибавляется*/

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('image-button');

    // Обработка нажатия мыши
    button.addEventListener('mousedown', handleMouseDown);

    // Обработка отпускания мыши
    button.addEventListener('mouseup', handleMouseUp);

    // Устанавливаем интервал для восстановления энергии каждую секунду
    setInterval(restoreEnergy, 1030);

    // Инициализируем начальное отображение энергии и прогресса монет
    updateEnergyDisplay();
    updateCoinsProgressDisplay();
});

let isMouseDown = false;

function handleMouseDown(event) {
    isMouseDown = true;
    handleClick(event);
}

function handleMouseUp() {
    isMouseDown = false;
}

// Функция для обработки нажатия на кнопку
function handleClick(event) {
    if (!isMouseDown) return;

    if (energyTap >= energyTapDecrement) {
        energyTap -= energyTapDecrement;
        coinsProgress += coinsIncrement;
        updateEnergyDisplay();
        updateCoinsProgressDisplay();

        // Получаем координаты клика относительно .coin
        const rect = event.currentTarget.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;

        showCoinNotification(`+${coinsIncrement} монет`, posX, posY);

        // Рекурсивный вызов для поддержки многократного нажатия
        setTimeout(() => handleClick(event), 100);
    } else {
        document.getElementById('image-button').addEventListener('click', function(event) {
            event.preventDefault();
        });
    }
}

function restoreEnergy() {
    if (energyTap < energyTapMax) {
        energyTap += 1; // Скорость восстановления энергии
        if (energyTap > energyTapMax) {
            energyTap = energyTapMax; // Предотвращаем превышение максимума
        }
        updateEnergyDisplay();
    }
}

function updateEnergyDisplay() {
    const energyDisplay = document.querySelector('.energy_tap');
    energyDisplay.innerHTML = `<img src="energy.png" alt="coin">${energyTap}/${energyTapMax}`;
}

function updateCoinsProgressDisplay() {
    const coinsProgressDisplay = document.querySelector('.farm_coins');
    coinsProgressDisplay.innerHTML = `<img src="coin.png" alt="coin">${coinsProgress}`;
}

function showCoinNotification(message, x, y) {
    const notification = document.createElement('div');
    notification.className = 'coin-notification';
    notification.innerText = message;
    notification.style.left = `${x}px`;
    notification.style.top = `${y}px`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 1000);
}

