const categoryElement = document.getElementById('category');
const selectedCategory = categoryElement ? categoryElement.value : 'general';
const props = {
    country: 'in',  
    category: selectedCategory || 'general',  
    apiKey: '82f29ced0070ab78f8a7488f8842c5c7',  
    pageSize: 10,
};

let page = 1;

const newsContainer = document.getElementById('news-container');
const categorySelect = document.getElementById('category');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

async function fetchNews() {
    const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&lang=en`;
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
    
    // Determine which articles to display based on the page number
    let articlesToDisplay;
    if (page === 1) {
        articlesToDisplay = articles.slice(0, 8); // Show the first 8 articles on the first page
    } else if (page === 2) {
        articlesToDisplay = articles.slice(8); // Show the remaining 2 articles on the second page
    }

    articlesToDisplay.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.className = 'news-article';

        // Use a fallback image if urlToImage is null
        const imageUrl = article.image ? article.image : 'https://via.placeholder.com/300x200?text=No+Image';
        
        const publishedDate = new Date(article.publishedAt);
        const formattedDate = `${publishedDate.toLocaleDateString()} ${publishedDate.toLocaleTimeString()}`;

        // Construct article content with proper fallbacks
        newsArticle.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <a style="text-decoration: none; color:black;" href="${article.url}" target="_blank">
                <h2>${article.title}</h2>
            </a>
            <a style="text-decoration: none; color:black;" href="${article.source.url}" target="_blank">
                <h2>Source: ${article.source.name}</h2>
            </a>
            <h4>Published on: ${formattedDate}</h4>
            <a style="color:black;" href="${article.url}" target="_blank">Read more -></a>
        `;
        
        newsContainer.appendChild(newsArticle);
    });
}

function updatePaginationControls(totalResults) {
    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= 2; // Disable next button after page 2
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
    if (page < 2) {
        page++;
        fetchNews();
    }
});

// Initial fetch
fetchNews();
