/** @format */

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Movie.css";

import ErrorMessage from "../errors/ErrorMessage";
import { destroyMovies, getOneMovies } from "../../api/fetch";

function Movie() {
	const [movie, setMovie] = useState({});
	const [loadingError, setLoadingError] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getOneMovies(id)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to fetch movie");
				}
			})
			.then((data) => {
				setMovie(data);
			})
			.catch((error) => {
				console.error(error);
				setLoadingError(true);
			});
	}, [id]);

	function handleDelete(movieId) {
		destroyMovies(movieId)
			.then((response) => {
				if (response.ok) {
					console.log("Movie deleted successfully");
					navigate("/");
				} else {
					throw new Error("Failed to delete movie");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<section className="movies-movie-wrapper">
			<h2>{movie.title}</h2>
			<section className="movies-movie">
				{loadingError ? (
					<ErrorMessage />
				) : (
					<>
						<aside>
							<p>
								<span>Duration:</span> {movie.duration}
							</p>
							<p>
								<span>Listed Categories:</span> {movie.listedIn}
							</p>
							<p>
								<span>Country:</span> {movie.country}
							</p>
							<p>
								<span>Rating:</span> {movie.rating}
							</p>
							<p>
								<span>Date Added:</span> {movie.dateAdded}
							</p>
						</aside>
						<article>
							<p>{movie.description}</p>
						</article>
						<aside>
							<button
								className="delete"
								onClick={() => handleDelete(movie.id)}>
								Remove movie
							</button>
							<Link to={`/movies/${id}/edit`}>
								<button>Edit</button>
							</Link>
						</aside>
					</>
				)}
			</section>
		</section>
	);
}

export default Movie;
