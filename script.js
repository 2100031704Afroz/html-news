// Dynamic properties for API
const categoryElement = document.getElementById('category');
const selectedCategory = categoryElement ? categoryElement.value : 'technology';
const props = {
    country: 'in',  
    category: selectedCategory|| 'technology',  
    apiKey: 'a40b7d37953f475a97117faf032fb0c7',  
    pageSize: 12, 
};

// Pagination settings
let page = 1;

const newsContainer = document.getElementById('news-container');
const categorySelect = document.getElementById('category');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Fetch news from the API with dynamic URL
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
        updatePaginationControls(data.totalResults);
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
        
        const publishedDate = new Date(article.publishedAt);
        const formattedDate = `${publishedDate.toLocaleDateString()} ${publishedDate.toLocaleTimeString()}`;
        // Construct article content with proper fallbacks
        newsArticle.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <a style="text-decoration: none; color:black;" href="${article.url}" target="_blank">
                <h2>${article.title}</h2>
            </a>
            <h4>Published on: ${formattedDate}</h4>
            <a style="color:black;" href="${article.url}" target="_blank">Read more-></a>
        `;
        
        newsContainer.appendChild(newsArticle);
    });
}

// Update pagination controls based on the total results
function updatePaginationControls(totalResults) {
    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= Math.ceil(totalResults / props.pageSize);
}

// Handle category change
categorySelect.addEventListener('change', (event) => {
    props.category = event.target.value;
    page = 1; // Reset to first page when category changes
    fetchNews();
});

// Handle pagination
prevButton.addEventListener('click', () => {
    if (page > 1) {
        page--;
        fetchNews();
    }
});

nextButton.addEventListener('click', () => {
    page++;
    fetchNews();
});

// Initial fetch
fetchNews();
