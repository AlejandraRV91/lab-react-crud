/** @format */

import { useState, useEffect } from "react";
import { getOneMovies, updateMovies } from "../../api/fetch";
import { useParams, useNavigate } from "react-router-dom";

import "./MoviesForm.css";

export default function MoviesEditForm() {
	const navigate = useNavigate();
	const [movie, setMovie] = useState({
		type: "",
		title: "",
		country: "",
		dateAdded: "",
		description: "",
		duration: "",
		listedIn: "",
		rating: "",
		releaseYear: "",
	});

	const { id } = useParams();

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
			});
	}, [id]);

	function handleSubmit(event) {
		event.preventDefault();

		updateMovies(id, movie)
			.then((response) => {
				if (response.ok) {
					console.log("Movie updated successfully");
					navigate("/");
				} else {
					throw new Error("Failed to update movie");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function handleTextChange(event) {
		setMovie({
			...movie,
			[event.target.id]: event.target.value,
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title:</label>
			<input
				type="text"
				id="title"
				value={movie.title}
				onChange={handleTextChange}
			/>

			<label htmlFor="description">Description:</label>
			<input
				type="text"
				id="description"
				value={movie.description}
				onChange={handleTextChange}
			/>

			<label htmlFor="type">Type</label>
			<input
				type="text"
				id="type"
				value={movie.type}
				onChange={handleTextChange}
			/>

			<label htmlFor="rating">Rating:</label>
			<input
				type="text"
				id="rating"
				value={movie.rating}
				onChange={handleTextChange}
			/>

			<label htmlFor="listedIn">Listed in</label>
			<input
				type="text"
				id="listedIn"
				value={movie.listedIn}
				onChange={handleTextChange}
			/>

			<label htmlFor="duration">Duration</label>
			<input
				type="text"
				id="duration"
				value={movie.duration}
				onChange={handleTextChange}
			/>

			<label htmlFor="releaseYear">Release Year</label>
			<input
				type="text"
				id="releaseYear"
				value={movie.releaseYear}
				onChange={handleTextChange}
			/>

			<label htmlFor="country">Country</label>
			<input
				type="text"
				id="country"
				value={movie.country}
				onChange={handleTextChange}
			/>

			<label htmlFor="dateAdded">Date added:</label>
			<input
				type="text"
				id="dateAdded"
				value={movie.dateAdded}
				onChange={handleTextChange}
			/>

			<br />

			<input type="submit" />
		</form>
	);
}
