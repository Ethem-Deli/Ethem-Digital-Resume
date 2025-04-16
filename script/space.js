function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStars(n, name, starField) {
    let stars = [];
    for(let i = 0; i < n; i++) {
        const x = randint(1, 2000);
        const y = randint(1, 2000);
        stars.push(`${x}px ${y}px #FFF`);
    }
    
    const starShadows = stars.join(',');
    
    const starCluster = document.createElement("div");    
    starCluster.style.boxShadow = starShadows;
    starCluster.classList.add(name);

    const nebula = document.createElement("span");
    nebula.style.boxShadow = starShadows;
    nebula.classList.add("nebula");

    starField.appendChild(starCluster);
    starCluster.appendChild(nebula);
}

function createStarField() {
    let starField = document.querySelector('#starfield');   
    generateStars(700, "smallStars", starField);
    generateStars(200, "mediumStars", starField);
    generateStars(100, "largeStars", starField);
}

document.addEventListener("DOMContentLoaded", e => {
    createStarField();
});
let starfieldVisible = true;

function toggleStarfield() {
    const starfield = document.getElementById('starfield');
    if (starfield) {
        starfieldVisible = !starfieldVisible;
        starfield.style.display = starfieldVisible ? 'block' : 'none';
    }
}
