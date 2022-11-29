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
import { ReactComponent as Star } from '../../img/Star.svg';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Preloader } from '../../components/Preloader';
import { GetGuestInfo } from '../../api';
import { DeleteRating } from '../../api';
import SmalSpinner from '../../img/SmalSpinner.gif';
import { useNavigate } from "react-router-dom";

export function MovieDetails() {
    const [movieData, setMovieData] = useState();
    const [video, setVideo] = useState();
    const [similar, setSimilar] = useState();
    const [reviews, setReviews] = useState();
    const [cast, setCast] = useState();
    const [similarArr, setSimilarArr] = useState(0);
    const [actorPhoto, setActorPhoto] = useState();
    const [actorName, setActorName] = useState(false);
    const [rating, setRating] = useState();
    const [ratingPreLoad, setRatingPreLoad] = useState(true);
    const [ratingChange, setRatingChange] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {movieId} = useParams();

    const navigate = useNavigate();
    const guestId = localStorage.getItem('guestId');    
    
    async function GuestRating(guestInfo, movieId) {
            for (let i = 0; i < guestInfo.length; i++) {
            if (`${guestInfo[i].id}` === movieId) {
                return (
                    setRating(guestInfo[i].rating),
                    setRatingChange(guestInfo[i].rating),
                    setRatingPreLoad(false)
                )
            }
        }
        return (
            setRating(),
            setRatingChange(),
            setRatingPreLoad(false)
        )
    }

    async function FetchDeleteRating() {
        return (
            await DeleteRating(movieId, guestId)
        )
    }

    async function FetchRating(ratingChange) {
        return (
            await PostRating(movieId, ratingChange, guestId)
        )
    }

    async function FetchGuestInfo() {
        const guestSessionId = localStorage.getItem('guestId');
        const info = await GetGuestInfo(guestSessionId);
        const guestInfo = await info.results;
        return (            
            GuestRating(guestInfo, movieId)
        )
    }
        
    async function FetchMovie() {
        const page = 1;
        let movie = await Movie(movieId);
        let video = await Video(movieId);
        let similar = await SimilarMovies(movieId, page);
        let reviews = await Reviews(movieId, page);
        let cast = await Cast(movieId);
        return (           
            setMovieData(movie),
            setVideo(video),
            setSimilar(similar),
            setReviews(reviews),
            setCast(cast),
            setIsLoading(false),
            !movie.id && navigate('/*')
        )
    }

    useEffect(() => {
        setIsLoading(true);
        FetchMovie();
        FetchGuestInfo()
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])
                                        
    return (
        isLoading ? 
        <Preloader />
        :
        <>
            <div className={styles.header}>
                <Header/>
            </div>
            {!!movieData &&
            <div className={styles.detailsContainer}>             
                <div className={styles.title}> 
                    {movieData.title}
                </div>
                <div className={styles.originalTitle}> {movieData.original_title} </div>
                <div className={styles.containerTop}>
                    {actorName && 
                        <div className={styles.actorInfo}>  
                            <img className={styles.actorPhoto} src={!!actorPhoto ? `https://image.tmdb.org/t/p/w500${actorPhoto}` : NoContent} alt=""/>
                            <div className={styles.actorName}>  {actorName} </div>
                        </div>
                    }               
                    <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt=""/> 
                    <div className={styles.containerRight} >
                        <div> <p> Tagline: </p> <span> {movieData.tagline === '' ? '-' : movieData.tagline} </span> </div>
                        <div> <p> Status: </p> <span> {!!movieData.status ? movieData.status : '-' } </span> </div>
                        <div> <p> Release date: </p> <span> {!!movieData.release_date ? movieData.release_date : '-' } </span> </div>
                        <div> <p> Production countries: </p> <span> {!!movieData.production_countries[0] ? movieData.production_countries[0].name : '-'} </span> </div>
                        <div> <p> Original language: </p> <span> {!!movieData.original_language ? movieData.original_language : '-' } </span> </div>
                        <div> <p> Spoken languages: </p> <span> {!!movieData.spoken_languages[0] ? movieData.spoken_languages[0].name : '-' } </span> </div>
                        <div> <p> Runtime: </p> <span> {!!movieData.runtime ? movieData.runtime : '-' } min </span> </div>
                        <div> 
                            <p> Genres: </p> 
                            <div className={styles.genresContainer}> 
                                {movieData.genres.map((data) => ( <span className={styles.genres} key={data.id} > {data.name} </span> ))}  
                            </div>  
                        </div>
                        <div> 
                            <p> Cast: </p> 
                            <div className={styles.cast}> 
                                {!!cast && <> {cast.cast.slice(0, 10).map((actors) => ( 
                                    <span onMouseLeave={() => setActorName(false)} onMouseEnter={() =>  {setActorPhoto(actors.profile_path); setActorName(actors.name)}} className={styles.actors} key={actors.id} > 
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
                {!!video.results[video.results.length-1] &&
                <iframe  
                    src={`https://www.youtube.com/embed/${video.results[video.results.length-1].key}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>    
                </iframe>}
                <div className={styles.vote}>
                    <div className={styles.rateTitle}> Rate the movie: </div>
                    <Star className={`${ratingChange >= 1 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(1)} onClick={() => {if (rating !== 1) { setRating(1); setRatingChange(1); FetchRating(1) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 2 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(2)} onClick={() => {if (rating !== 2) { setRating(2); setRatingChange(2); FetchRating(2) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 3 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(3)} onClick={() => {if (rating !== 3) { setRating(3); setRatingChange(3); FetchRating(3) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 4 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(4)} onClick={() => {if (rating !== 4) { setRating(4); setRatingChange(4); FetchRating(4) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 5 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(5)} onClick={() => {if (rating !== 5) { setRating(5); setRatingChange(5); FetchRating(5) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 6 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(6)} onClick={() => {if (rating !== 6) { setRating(6); setRatingChange(6); FetchRating(6) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 7 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(7)} onClick={() => {if (rating !== 7) { setRating(7); setRatingChange(7); FetchRating(7) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 8 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(8)} onClick={() => {if (rating !== 8) { setRating(8); setRatingChange(8); FetchRating(8) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange >= 9 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(9)} onClick={() => {if (rating !== 9) { setRating(9); setRatingChange(9); FetchRating(9) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <Star className={`${ratingChange === 10 ? styles.star2 : styles.star1}`} onMouseLeave={() => setRatingChange(rating)} onMouseEnter={() => setRatingChange(10)} onClick={() => {if (rating !== 10) { setRating(10); setRatingChange(10); FetchRating(10) } else { setRating(); setRatingChange(); FetchDeleteRating()}}} />
                    <div className={styles.average}> {movieData.vote_average} </div>
                    <div className={styles.count} >  ({movieData.vote_count}) </div>
                    {ratingPreLoad && <img className={styles.smalSpinner} src={SmalSpinner} alt=""/>}
                </div> 
                <div className={styles.head} >
                    The similar movies:
                </div>
                <div className={styles.movieCardContainer}  >
                    {similarArr !== 0 ?
                    <FcPrevious className={styles.gr} onClick={() => setSimilarArr(similarArr-5)}/> 
                    : <div className={styles.emptyGr}>  </div>}
                    <div onClick={() => MovieDetails()} >
                    <MovieCard className={styles.movieCard} moviesData={similar.results.slice(similarArr, similarArr+5)} /> 
                    </div>
                    {similarArr !== 15 ?
                    <FcNext className={styles.gr} onClick={() => setSimilarArr(similarArr+5)}/>
                    : <div className={styles.emptyGr}>  </div>}
                </div>
                <div className={styles.head}>
                    Users reviews for a movie:
                </div>
                {!!reviews &&
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
            </div>}
        </>
    );
}