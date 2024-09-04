const apiKey = 'a40b7d37953f475a97117faf032fb0c7';
const newsContainer = document.getElementById('news-container');

// Fetch news from the API
async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching the news:', error);
    }
}

// Display the news articles on the page
function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.className = 'news-article';

        // Use a fallback image if urlToImage is null
        const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x200?text=No+Image';

        // Check if the description is null and provide a default message
        const description = article.description ? article.description : 'No description available';

        newsArticle.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <a style="text-decoration: none; color:black;" href="${article.url}" target="_blank"><h2>${article.title}</h2></a>

            <p>${description}</p>
            <a style="color:black;" href="${article.url}" target="_blank">Read more</a>
        `;
        
        newsContainer.appendChild(newsArticle);
    });
}

// Call the fetchNews function to load the articles
fetchNews();
