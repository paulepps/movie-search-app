
const api_key = '17ba521d68525d080424b09a36bd4778';

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

export async function Movies(page, movieType) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieType}?api_key=${api_key}&language=en-US&page=${page}`
        );
        const movies = await api_url.json();
        return movies
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Movie(movieId) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
        );
        const movie = await api_url.json();
        return movie
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Video(movieId) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`
        );
        const video = await api_url.json();
        return video
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function SimilarMovies(movieId, page) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=${page}`
        );
        const similarMovies = await api_url.json();
        return similarMovies
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Reviews(movieId, page) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${api_key}&language=en-US&${page}`
        );
        const reviews = await api_url.json();
        return reviews
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Cast (movieId) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
        );
        const cast  = await api_url.json();
        return cast 
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function PostRating (movieId, ratingChange) {
    try {
        const api_url = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${api_key}`, {
                method: 'POST',
                body: {"value": ratingChange}
            }
        );
        const postRating  = await api_url();
        return postRating;
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Authentication () {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`
        );
        const cast  = await api_url.json();
        return cast 
    } catch (error) {
        console.log("Error:", error);
    }
}