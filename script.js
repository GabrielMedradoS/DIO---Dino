const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
let isJumping = false //condiçao para ver se já esta pulando
let position = 0;

handleKeyUp = (event) => {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

jump = () => {
    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval); //cortar o intervalo de subir
            
        //descendo
        let downInterval = setInterval(() => {
            if (position <= 0) {
                clearInterval(downInterval); //cortar o intervalo de descer
                isJumping = false
            } else {
            position -= 20;
            dino.style.bottom = `${position}px`;
            }
        }, 20);
        } else {
            //subindo
            position += 20;
            dino.style.bottom = `${position}px`;
        }
    }, 20);
}

createCactus = () => {
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = `${1000}px`; // começar a aparecendo 
    background.appendChild(cactus);
   
    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){ // condiçao de contato entre 0 e 60
        //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class= "gameOver">Fim de jogo </h1>`;
        } else{
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`
        }
    }, 20)

    //estou chamando a funçao depois de um certo periodo de tempo (funçao, tempo)
    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);