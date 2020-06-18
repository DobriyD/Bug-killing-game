let buttons = document.querySelectorAll('button');
const button = document.querySelector('button'),
    button_none = document.querySelector('.button_none'),
    field = document.querySelector('.field');
let bestScore = 0;
let clicks = 0;

// get random number
const random = (min, max) => {
    const rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
};


// get random color
const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// get random color to the button with delay
setInterval(() => {
    buttons.forEach(button => {
        button.style.backgroundColor = getRandomColor();
    })
}, 1000);


//hide bugs when color of hidden button = color of a bug
setTimeout(() => {
    if (button_none.style.backgroundColor === button.style.backgroundColor) {
        button.style.display = 'none';
    }
}, 1000);


//set timeout between clicks
button.addEventListener('click', () => {
    button.setAttribute("disabled", "disabled");
    setTimeout(() => {
        button.removeAttribute("disabled");
    }, 1000)
})


// set a delay to the first button to get opportunity for clicking on it
button.addEventListener('mouseover', () => {
    setTimeout(() => {
        button.style.top = `${random(10, 80)}%`;
        button.style.left = `${random(5, 85)}%`;
    }, 400)
});

//creating a new buttons with all previous functions
const createNewButton = text => {
    for (let i = 0; i < 2; i++) {
        const newButton = document.createElement('button')
        newButton.innerHTML = text;
        newButton.type = 'button';
        newButton.onclick = onClick();

        newButton.addEventListener('click', () => {
            createNewButton(text);
            newButton.remove();
        });
        newButton.addEventListener('mouseover', function ()  {
            setTimeout( () => {
                this.style.top = `${random(10, 80)}%`;
                this.style.left = `${random(5, 85)}%`;
            }, 400)
        });

        const container = document.querySelector('.field');
        container.appendChild(newButton);
        buttons = document.querySelectorAll('button');

        //change position after appearance
        newButton.style.top = `${random(10, 80)}%`;
        newButton.style.left = `${random(5, 85)}%`;
    }

};

// delete bug
const deleteButton = () => {
    button.remove();
};

// create 2 bugs and delete one, which was clicked
button.addEventListener('click', () => {
    createNewButton('');
    deleteButton();
});


//add score count

function onClick() {
    clicks += 0.5;
    document.getElementById('clicks').innerHTML = clicks;
    localStorage.setItem('clicks', clicks);
    if (bestScore < clicks) {
        localStorage.setItem('bestScore', clicks)
    }
}


//saving score to local storage

if (localStorage.getItem('bestScore')) {
    bestScore = JSON.parse(localStorage.getItem('bestScore'));
    document.getElementById('bestScore').innerHTML = bestScore;
}

