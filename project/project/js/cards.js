const API_URL = "https://jsonplaceholder.typicode.com/posts";
const cardContainer = document.getElementById("card-container");

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const posts = await response.json();
        renderCards(posts);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        cardContainer.innerHTML = "<p>Не удалось загрузить данные. Попробуйте позже.</p>";
    }
}

function renderCards(posts) {
    const imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9m8jRvKguYBjFGoAcRCG5PsBDMhPFcmG3A&s"
    const cardsHTML = posts.slice(0, 10).map(post => `
    <div class="card">
      <img src="${imageURL}" alt="Card Image">
      <div class="card-content">
        <h3 class="card-title">${post.title}</h3>
        <p class="card-description">${post.body}</p>
      </div>
    </div>
  `).join("");
    cardContainer.innerHTML = cardsHTML;
}

fetchPosts();
