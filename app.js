const NEWS_API_KEY = 'b83ca6b5629443aca3a5ec44a9f0b51e';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post'
window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
            console.log('Service Worker registered');
        }catch(error){
            console.log('Error in registering Service Worker');
        }
    }
});

async function updateNews(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&apiKey=${NEWS_API_KEY}`);
    const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join("\n");
}

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${NEWS_API_KEY}`);
    const data = await res.json();
    sourceSelector.innerHTML = data.sources.map(createSource).join("\n");
}

function createSource(source){
    return `
        <option value="${source.id}">${source.name}</option>
    `
}

function createArticle(article){
    return `
        <div class="article">
            <a href="${article.url}">
                <p class="title">${article.title}</p>
                <img src="${article.urlToImage}">
                <p class="description">${article.description}</p>
            </a>
        </div>
    
    `
}