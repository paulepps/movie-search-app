import styles from './MovieDetails.module.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import { Movie } from '../../api';
import { Video } from '../../api';
import { SimilarMovies } from '../../api';
import { Reviews } from '../../api';
import { Cast } from '../../api';
import { PostRating } from '../../api';
import { MovieCard } from '../../components/MovieCard';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
import NoContent from '../../img/NoContent.png';
import {ReactComponent as Star } from '../../img/Star.svg';
import { useParams } from 'react-router-dom';

export function MovieDetails({guestId}) {
    const [movieData, setMovieData] = useState();
    const [video, setVideo] = useState();
    const [similar, setSimilar] = useState();
    const [reviews, setReviews] = useState();
    const [cast, setCast] = useState();
    const [similarArr, setSimilarArr] = useState(0);
    const [actorPhoto, setActorPhoto] = useState(false);
    const [actorName, setActorName] = useState();
    const [rating, setRating] = useState();
    const [ratingChange, setRatingChange] = useState();
    //const [postRating, setPostRating] = useState();
    //const [ratingData, setRatingData] = useState();
    
    const {id} = useParams();
    //const [movieId, setMovieId] = useState(id);

     async function fetchRating() {
         const movieId = id;
         return (
             await PostRating(movieId, ratingChange, guestId)
        )
    }
        
    async function fetchMovie() {
        const movieId = id;
        const page = 1;
        return (
            setMovieData(await Movie(movieId)),
            setVideo(await Video(movieId)),
            setSimilar(await SimilarMovies(movieId, page)),
            setReviews(await Reviews(movieId, page)),
            setCast(await Cast(movieId))
        )
    }

    useEffect(() => {
        fetchMovie();
        console.log(guestId);
        //window.scrollTo(0, 0); ------------------------------------------------------------------------------
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        movieData !== undefined &&
        <div className={styles.detailsContainer}>
            <div className={styles.title}> {movieData.title} <button onClick={() => window.history.go(-1)} > Back &gt; </button> </div>
            <div className={styles.originalTitle}> {movieData.original_title} </div>
            <div className={styles.containerTop}>
                {actorPhoto !== false && 
                    <div className={styles.actorInfo}>  
                        <img className={styles.actorPhoto} src={actorPhoto !== null ? `https://image.tmdb.org/t/p/w500${actorPhoto}` : NoContent} alt=""/>
                        <div className={styles.actorName}>  {actorName} </div>
                    </div>
                }                
                <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`} alt=""/> 
                <div className={styles.containerRight} >
                    <div> <p> Tagline: </p> <span> {movieData.tagline === '' ? '-' : movieData.tagline} </span> </div>
                    <div> <p> Status: </p> <span> {movieData.status} </span> </div>
                    <div> <p> Release date: </p> <span> {movieData.release_date} </span> </div>
                    <div> <p> Production countries: </p> <span> {movieData.production_countries[0].name} </span> </div>
                    <div> <p> Original language: </p> <span> {movieData.original_language} </span> </div>
                    <div> <p> Spoken languages: </p> <span> {movieData.spoken_languages[0].name} </span> </div>
                    <div> <p> Runtime: </p> <span> {movieData.runtime} min </span> </div>
                    <div> 
                        <p> Genres: </p> 
                        <div className={styles.genresContainer}> 
                            {movieData.genres.map((data) => ( <span className={styles.genres} key={data.id} > {data.name} </span> ))}  
                        </div>  
                    </div>
                    <div> 
                        <p> Cast: </p> 
                        <div className={styles.cast}> 
                            {cast !== undefined && <> {cast.cast.slice(0, 10).map((actors) => ( 
                                <span onMouseLeave={() => setActorPhoto(false)} onMouseEnter={() =>  {setActorPhoto(actors.profile_path); setActorName(actors.name)}} className={styles.actors} key={actors.id} > 
                                    {actors.name}{cast.cast[cast.cast.slice(0, 10).length-1].name === actors.name ? '.' : ','} 
                                </span> ))} 
                            </>}
                        </div> 
                    </div>  
                </div>
            </div>
            <div className={styles.overview}>                 
                <span > What is the «{movieData.title}» movie about: </span>
                <div> {movieData.overview} </div>
            </div>            
            <iframe  
                src={`https://www.youtube.com/embed/${video !== undefined ? video.results[video.results.length-1].key : 'dQw4w9WgXcQ'}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>    
            </iframe>
            <div className={styles.vote}>
                <div className={styles.rateTitle}> Rate the movie: </div>
                <Star className={`${ratingChange >= 1 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(1)} onClick={() => {rating !== 1 ? setRating(ratingChange) : setRating(); fetchMovie()}} />
                <Star className={`${ratingChange >= 2 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(2)} onClick={() => {rating !== 2 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 3 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(3)} onClick={() => {rating !== 3 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 4 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(4)} onClick={() => {rating !== 4 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 5 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(5)} onClick={() => {rating !== 5 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 6 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(6)} onClick={() => {rating !== 6 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 7 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(7)} onClick={() => {rating !== 7 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 8 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(8)} onClick={() => {rating !== 8 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange >= 9 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(9)} onClick={() => {rating !== 9 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <Star className={`${ratingChange === 10 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(10)} onClick={() => {rating !== 10 ? setRating(ratingChange) : setRating(); fetchRating()}} />
                <div className={styles.average}> {movieData.vote_average} </div>
                <div className={styles.count} >  ({movieData.vote_count}) </div>
            </div>
            <div className={styles.head} >
                The similar movies:
            </div>
            <div className={styles.movieCardContainer}>
                {similarArr !== 0 ?
                <FcPrevious className={styles.gr} onClick={() => setSimilarArr(similarArr-5)}/> 
                : <div className={styles.emptyGr}>  </div>}
                {similar !== undefined && 
                <MovieCard className={styles.movieCard} moviesData={similar.results.slice(similarArr, similarArr+5)}/> }
                {similarArr !== 15 ?
                <FcNext className={styles.gr} onClick={() => setSimilarArr(similarArr+5)}/>
                : <div className={styles.emptyGr}>  </div>}
            </div>
            <div className={styles.head}>
                Users reviews for a movie:
            </div>
            {reviews !== undefined &&
            <div> 
                {reviews.results.length === 0 ? <div className={styles.noResults}> No results. </div> :
                reviews.results.map((review) => (                 
                    <div className={styles.reviewContainer} key={review.id}>
                        <div className={styles.author}>
                            {review.author_details.avatar_path !== null ? 
                            <img src={review.author_details.avatar_path.slice(9, 25) === 'www.gravatar.com' ? review.author_details.avatar_path.slice(1, review.author_details.avatar_path.length) : `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`} alt="" />
                            : <img src={NoContent} alt="" />
                            }
                            <div > Written <span> {review.author} </span> in {review.created_at.slice(0, 10)} </div>
                        </div>
                        <div className={styles.content}> 
                            {review.content}   
                        </div>
                        <div className={styles.updated}> 
                            Last updated: {review.updated_at.slice(0, 10)}   
                        </div>
                    </div>))}
            </div>}
            <div className={styles.botButton}>
                <button onClick={() => window.history.go(-1)}> Back &gt; </button>
            </div>
        </div>
    );
}
//.slice(0, review.author_details.avatar_path.length)
// onMouseEnter={() => console.log(reviews)}
//{moviesData !== undefined &&<img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${moviesData.filter((el) => el.id === movieId)[0].poster_path}`} alt=""/>} 
