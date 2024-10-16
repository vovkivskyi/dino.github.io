const dino = document.getElementById('dino');
let isJumping = false;
let gravity = 0.9;
let position = 0;

// Додаємо стрибок динозавра
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        if (!isJumping) {
            jump();
        }
    }
});

function jump() {
    let count = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        // Стрибок
        if (count === 15) {
            clearInterval(upInterval);
            // Падіння
            let downInterval = setInterval(() => {
                if (count === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                count--;
                position = position * gravity;
                dino.style.bottom = position + 'px';
            }, 20);
        }

        // Підйом
        position += 30;
        count++;
        dino.style.bottom = position + 'px';
    }, 20);
}

// Рух і генерація кактусів
function createCactus() {
    let cactus = document.createElement('div');
    cactus.classList.add('cactus');
    document.getElementById('game').appendChild(cactus);
    
    let cactusPosition = 1000;
    let randomTime = Math.random() * 4000;

    cactus.style.left = cactusPosition + 'px';

    let timerId = setInterval(() => {
        if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(timerId);
            alert('Game Over');
            document.location.reload();
        }

        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -60) {
            clearInterval(timerId);
            cactus.remove();
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

// Додаємо стилі для кактусів
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .cactus {
            position: absolute;
            width: 100px;
            height: 133px;
            background: url('cactus.png') no-repeat;
            bottom: 0;
        }
    </style>
`);

// Запускаємо генерацію кактусів
createCactus();
