let buttons = document.querySelectorAll('button');
const button = document.querySelector('button'),
    field = document.querySelector('.field'),
    colors = ['red', 'green', 'blue', 'yellow', 'cyan'];

// get random number
const random = (min, max) => {
    const rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
};

// get random color
const getRandomColor = () => {
    return colors[random(0, colors.length - 1)]
};

// get random color to the button with delay
setInterval(() => {
    buttons.forEach(button => {
        button.style.backgroundColor = getRandomColor();
    })
}, 1000);

// set a delay to the first button to get opportunity for clicking on it
button.addEventListener('mouseover', () => {
    setTimeout(() => {
        button.style.top = `${random(10, 90)}%`;
        button.style.left = `${random(5, 95)}%`;
    }, 1000)
});

// creating a new buttons with all previous functions
const createNewButton = text => {
    const newButton = document.createElement('button');
    newButton.innerHTML = text;
    newButton.type = 'button';
    newButton.onclick = onClick();

    newButton.addEventListener('click', () => {
        createNewButton(text);


    });
    newButton.addEventListener('mouseover', function ()  {
        setTimeout( () => {
            this.style.top = `${random(10, 90)}%`;
            this.style.left = `${random(5, 95)}%`;
        }, 1000)
    });

    const container = document.querySelector('.field');
    container.appendChild(newButton);
    buttons = document.querySelectorAll('button');
};

button.addEventListener('click', () => createNewButton(''));

//add score count
let clicks = 0;
let bestScore;
function onClick() {
    clicks += 1;
    document.getElementById('clicks').innerHTML = clicks;
    localStorage.setItem('clicks', clicks);
}

//saving score to local storage
// by now it's last score
if (localStorage.getItem('clicks')) {
    bestScore = JSON.parse(localStorage.getItem('clicks'));
    document.getElementById('bestScore').innerHTML = bestScore;

}

