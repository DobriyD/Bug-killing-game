let buttons = document.querySelectorAll('button'),
    gameTime = document.getElementById('game_time');
const button = document.querySelector('button'),
    buttonNone = document.querySelector('.button_none'),
    buttonStart = document.querySelector('.button_start'),
    field = document.querySelector('.field');
let bestScore = 0;
let clicks = 0;
let secondsCount = 30;
let colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'purple'];



// get random number
const random = (min, max) => {
    const rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
};


// get random color
// const getRandomColor = () => {
//     let letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };


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


//add score count
function onClick() {
    clicks += 0.5;
    document.getElementById('clicks').innerHTML = clicks;
    localStorage.setItem('clicks', clicks);
    if (bestScore < clicks) {
        localStorage.setItem('bestScore', clicks)
    }
}


// //set timeout between clicks
// button.addEventListener('click', () => {
//     button.setAttribute("disabled", "disabled");
//     setTimeout(() => {
//         button.removeAttribute("disabled");
//     }, random(10, 400))
// });


// set a delay to the first button to get opportunity for clicking on it
button.addEventListener('mouseover', () => {
    setTimeout(() => {
        button.style.top = `${random(7, 95)}%`;
        button.style.left = `${random(13, 95)}%`;
    }, 400)
});

//creating a new buttons with all previous functions
const createNewButton = text => {
    for (let i = 0; i < 2; i++) {
        const newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.type = 'button';
        newButton.onclick = onClick();

        newButton.addEventListener('click', () => {
            createNewButton(text);
            newButton.remove();
        });
        newButton.addEventListener('mouseover', function () {
            setTimeout(() => {
                this.style.top = `${random(7, 95)}%`;
                this.style.left = `${random(13, 95)}%`;
            }, random(10, 400))
        });

        const container = document.querySelector('.field');
        container.appendChild(newButton);
        buttons = document.querySelectorAll('button');

        //change position after appearance
        newButton.style.top = `${random(7, 95)}%`;
        newButton.style.left = `${random(13, 95)}%`;

        //hide bugs when color of hidden button = color of a bug
        setTimeout(() => {
            if (buttonNone.style.backgroundColor != newButton.style.backgroundColor) {
                newButton.style.display = 'block';
            } else {
                newButton.style.display = 'none';
            }
        }, 1000);
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


//saving score to local storage
if (localStorage.getItem('bestScore')) {
    bestScore = JSON.parse(localStorage.getItem('bestScore'));
    document.getElementById('bestScore').innerHTML = bestScore;
} else {
    document.getElementById('bestScore').innerHTML = bestScore;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// let timerId = setInterval(countdown, 1000);
buttonStart.addEventListener("click", async () => {
    buttonStart.innerText = '';
    let countDown = ['Ready?','Steady...','Go!', ''];
    countDown.forEach((element, i) => {
        setTimeout(() => {
            buttonStart.innerText = element;
            //console.log(element)
        }, (i + 1) * 700)
    });

    await sleep(2100);

    setInterval(function countdown() {
        if (secondsCount == -1) {
            // clearTimeout(timerId);
            alert('Game Over');
            location.reload();
        } else {
            gameTime.innerHTML = secondsCount + ' seconds left';
            secondsCount--;
        }
    }, 1000)
});
