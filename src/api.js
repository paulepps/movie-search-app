
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

// export async function Movies(page, movieType) {
//     try {
//         const api_url = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieType}?api_key=${api_key}&language=en-US&page=${page}`
//         );
//         const movies = await api_url.json();
//         return movies
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }

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

export async function PostRating (movieId, ratingChange, guestId) {
    const value = {"value": ratingChange};
    try {
        await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${api_key}&guest_session_id=${guestId}`, 
            {
                method: "POST",
                headers: 
                { 
                    "Content-Type": "application/json;charset=utf-8" 
                },
                body: JSON.stringify(value),
            }
        )
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function DeleteRating (movieId, guestId) {
    try {
        await fetch(           
            `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${api_key}&guest_session_id=${guestId}`, 
            {
                method: "DELETE",
                headers: 
                { 
                    "Content-Type": "application/json;charset=utf-8" 
                }
            }
        )
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Authentication () {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`
        );
        const authentication  = await api_url.json();
        return authentication 
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function GetGuestInfo (guestSessionId) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${api_key}&language=en-US&sort_by=created_at.asc`
        );
        const guestInfo  = await api_url.json();
        return guestInfo 
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Movies (page, genreId, sortBy) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=${sortBy}.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_monetization_types=flatrate`
        );
        const movie  = await api_url.json();
        return movie 
    } catch (error) {
        console.log("Error:", error);
    }
}

export async function Search (page, searchValue) {
    try {
        const api_url = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`
        );
        const search  = await api_url.json();
        return search 
    } catch (error) {
        console.log("Error:", error);
    }
}
