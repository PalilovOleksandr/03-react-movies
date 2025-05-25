import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { type Movie } from "../../types/movie";
import { useState } from "react";
import toast from "react-hot-toast";
import ToasterMessage from "../Toaster/Toaster";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Movie | null>(null);
    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setIsError(false);
        setMovies([]);
        try {
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error("No movies found for your request.");
                return;
            }
            setMovies(data);
        } catch {
            setIsError(true)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            <ToasterMessage />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && <MovieGrid onSelect={setSelectedCard} movies={movies} />}
            {selectedCard && <MovieModal onClose={setSelectedCard} movie={selectedCard} />}
        </div>
    )
}