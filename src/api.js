
//const API_KEY = '17ba521d68525d080424b09a36bd4778';

export async function Genres() {
    try {
        const api_url = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=17ba521d68525d080424b09a36bd4778&language=en-US'
        );
        const genres = await api_url.json();
        return genres
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Discover(isActive) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=17ba521d68525d080424b09a36bd4778&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${isActive}&with_watch_monetization_types=flatrate`
        );
        const discover = await api_url.json();
        return discover
    } catch (error) {
        console.log("Error:", error);
    }
}