document.getElementById("gmail_button").addEventListener("click", function() {
    const emailInput = document.getElementById("gmail_input").value
    const resultDisplay = document.getElementById("gmail_result")

    if (validateGmail(emailInput)) {
        resultDisplay.textContent = "Good:)"
        resultDisplay.style.color = "green"
    } else {
        resultDisplay.textContent = "Error"
        resultDisplay.style.color = "red"
    }
})

function validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    return gmailRegex.test(email)
}

//Part 2
const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

const parentSize = parentBlock.offsetWidth
const childSize = childBlock.offsetWidth

let currentCorner = 0
const moveTime = 2000

const corners = [
    { top: 0, left: 0 },
    { top: 0, left: parentSize - childSize },
    { top: parentSize - childBlock.offsetHeight, left: parentSize - childSize },
    { top: parentSize - childBlock.offsetHeight, left: 0 }
]

const moveBlock = () => {
    const corner = corners[currentCorner]
    childBlock.style.transition = `top ${moveTime / 1000}s, left ${moveTime / 1000}s`
    childBlock.style.top = `${corner.top}px`
    childBlock.style.left = `${corner.left}px`

    currentCorner = (currentCorner + 1) % corners.length

    setTimeout(moveBlock, moveTime)
}

moveBlock()


//ДЗ 2
const secondsBlock = document.querySelector("#seconds")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")

let seconds = 0
let interval = null

startBtn.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            seconds++
            secondsBlock.innerHTML = seconds
        }, 1000)
    }
}
stopBtn.onclick = () => {
    clearInterval(interval)
    interval = null
}

resetBtn.onclick = () => {
    seconds = 0
    secondsBlock.innerHTML = seconds
    clearInterval(interval)
    interval = null
}

//CHARACTERS

const charactersList = document.querySelector(".characters-list")

const generateCharactersCards = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '../data/characters.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response)
        data.forEach(character => {
            const characterCard = document.createElement('div')
            characterCard.classList.add('character-card')

            characterCard.innerHTML = `
              <h2>${character.name}</h2>        
              <h4>age:${character.age}</h4>
              <img src="${character.photo}" alt="characters">
           `

            charactersList.append(characterCard)

        })
    }
}

generateCharactersCards()



const xhr = new XMLHttpRequest()

xhr.open('GET', "../data/any.json",)

xhr.onload = function () {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        console.log(data)
    } else {
        console.error('Ошибка', xhr.status, xhr.statusText)
    }
}

xhr.send();


