// const BASE_URL = 'https://gnews.io/api/v4/'
// const DATABASE_URL =  'localhost:8000'

// query parameters
// q - filter by keyword
// max - maximum number of returned articles
// in (title, description, content) - which attribute of the article will be searched
// from - publication date
// to - publication before this publication date
// sortby (publishedAt, relevance) - sort by most recent; most closely matches
// allows and/or/not operators
// allows search of top headlines/breaking news; 'url/top-headlines?'

// Need to hide token
// Need to grab stock/sector. Where?
// Sideload
// check database every 12 hr before doing a call
const fetchNewsByStock = (keyword) => {    
    return fetch(`https://gnews.io/api/v4/search?q=${keyword}&token=ec8efd05e7ed8b2bcebd050d0dc61147`)
    .then((response) => response.json())   
}

const fetchNewsBySector = (newsSectorSearch) => {
    return fetch(`https://gnews.io/api/v4/search?q=${newsSectorSearch}token=ec8efd05e7ed8b2bcebd050d0dc61147`)
    .then((response) => response.json())
}

const updateNewsBySector = () => {
    //Need CRUD url to check articles oldest data
    cachedData = fetch(`localhost:8000`)
    .then((response) => response.json())
    //returns current date and time in zulu
    //zulu is +4
    let currentDate = new Date()
    //unsure of format of returned json from backend. call would look similar
    let lastCached = cachedData['publishdate']
    //43200000 is 12 hours
    let timeDifference = currentDate - lastCached
    if (timeDifference >= 43200000) {
        fetchNewsByStock()
        return
    }
}

// Just extra to look at
const fetchBreakingNews = () => {
    return fetch(`https://gnews.io/api/v4/top-headlines?&token=ec8efd05e7ed8b2bcebd050d0dc61147`)
    .then((response) => response.json())
}
    
const exportedObject = {
    fetchNewsBySector,
    fetchNewsByStock,
    fetchBreakingNews,
    updateNewsBySector
};      

export default exportedObject;