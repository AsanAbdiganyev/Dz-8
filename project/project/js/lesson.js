// //T.S
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let currentTab = 0

const hideTabContent = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = "none";
    });
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = "block";
    tabs[id].classList.add('tab_content_item_active');
}


const switchTab = () => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabs.length;
    showTabContent(currentTab);
}

hideTabContent();
showTabContent();
setInterval(switchTab, 3000);

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                currentTab = tabIndex;
                showTabContent(currentTab);
            }
        });
    }
};




//CONVERT
const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")


somInput.oninput = () => {
    const request = new XMLHttpRequest()
    request.open("GET", '../data/converter.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response)
        usdInput.value = (somInput.value / data.usd).toFixed(2)
        eurInput.value = (somInput.value / data.eur).toFixed(2)
    }
}

usdInput.oninput = () => {
    const request = new XMLHttpRequest()
    request.open("GET", '../data/converter.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response);
        somInput.value = (usdInput.value * data.usd).toFixed(2)
        eurInput.value = ((usdInput.value * data.usd) / data.eur).toFixed(2)
    }
}

eurInput.oninput = () => {
    const request = new XMLHttpRequest()
    request.open("GET", '../data/converter.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response)
        somInput.value = (eurInput.value * data.eur).toFixed(2)
        usdInput.value = ((eurInput.value * data.eur) / data.usd).toFixed(2)
    }
}




//DRY - don`t repeat yourself
//KISS - keep it super stupid

//CARD SWITCHER

const nextButton = document.querySelector("#btn-next")
const prevButton = document.querySelector("#btn-prev")
const cardBlock = document.querySelector(".card")

let cardIndex = 1
const maxCards = 200

const loadCard = async (index) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`);
        if (!response.ok) throw new Error("Error fetching card");
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>${data.completed ? "Completed" : "Not completed"}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        cardBlock.innerHTML = "<p>Error</p>";
        console.error(error);
    }
};

loadCard(cardIndex);

nextButton.onclick = () => {
    cardIndex = cardIndex < maxCards ? cardIndex + 1 : 1;
    loadCard(cardIndex);
};

prevButton.onclick = () => {
    cardIndex = cardIndex > 1 ? cardIndex - 1 : maxCards;
    loadCard(cardIndex);
};

//2)
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error('Error fetching posts:', error.message)
    })




//WEATHER
const searchButton  = document.querySelector("#search");
const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city")
const temp = document.querySelector(".temp");

const APP_ID = "e417df62e04d3b1b111abeab19cea714"
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

searchButton.onclick = async () => {
    try {
        const response = await fetch(`${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric`)
        const data = await response.json()
        city.innerHTML = data.name || 'ГОРОД не найден'
        temp.innerHTML = `
        <span>${data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : ''}</span>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
      `
    } catch (e) {
        console.log(e)
    }

}

