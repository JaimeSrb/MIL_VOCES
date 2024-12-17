let currentBackgroundIndex = 0;
const backgrounds = ['INICIO.jpg', 'PASILLO.jpg', 'VELA.jpg', 'CAR.jpg'];

function cambiarFondo() {
    const backgroundImage = document.querySelector('.background-image');
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    backgroundImage.style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
    hideElements();
    setTimeout(() => {
        createNewElements();
    }, 10);
}

setInterval(cambiarFondo, 5000);

function hideElements() {
    const randomWords = document.querySelectorAll('.random-word');
    randomWords.forEach(word => word.style.opacity = '0');
    setTimeout(() => {
        randomWords.forEach(word => word.remove());
    }, 1);
}

function createNewElements() {
    let newWords = [];

    if (backgrounds[currentBackgroundIndex] === 'PASILLO.jpg') {
        newWords = ["Proyectos que requieren mucho tiempo", "Mucha teoría, poca práctica", "Algunas clases son muy aburridas", "La Unidad siempre está llena", "Falta de apoyo psicológico", "Estudiantes de diferentes culturas conviviendo"];
    } else if (backgrounds[currentBackgroundIndex] === 'VELA.jpg') {
        newWords = ["Necesidad de mejores becas y ayudas", "Grupos de estudio que te motivan", "Algunas aulas no están bien equipadas", "El transporte universitario es muy incómodo", "La competencia entre compañeros es alta", "La carga académica es realmente pesada"];
    } else if (backgrounds[currentBackgroundIndex] === 'INICIO.jpg') {
        newWords = ["Estrés por los exámenes", "Clases interesantes pero agotadoras", "Amigos para toda la vida", "Horarios complicados y poco flexibles", "Buen ambiente académico"];
    } else {
        newWords = ["Las opciones de comida son caras y limitadas", "El estacionamiento siempre está lleno", "La biblioteca carece de espacios tranquilos"];
    }

    newWords.forEach((word, index) => createRandomElement('random-word', word, (index + 12) * 0.1));
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomFontSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(element) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const randomX = Math.random() * (width - element.offsetWidth);
    const randomY = Math.random() * (height - element.offsetHeight);
    return { x: randomX, y: randomY };
}

function checkOverlap(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function createRandomElement(type, text = '', delay) {
    const element = document.createElement('div');
    element.classList.add(type);
    element.style.animation = `fadeIn 1s ${delay}s forwards`;
    element.textContent = text;
    element.style.fontSize = `${getRandomFontSize(18, 62)}px`;
    document.body.appendChild(element);

    let position;
    let attempts = 0;
    do {
        position = getRandomPosition(element);
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
        attempts++;
    } while (Array.from(document.querySelectorAll('.random-word')).some(other => other !== element && checkOverlap(element, other)) && attempts < 100);

    element.style.color = getRandomColor();
}