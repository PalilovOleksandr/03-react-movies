import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
    onSelect: () => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {movies.map(({ id, poster_path, title }) => (
                <li key={id}>
                    <div className={css.card} onClick={onSelect}>
                        <img
                            className={css.image}
                            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                            alt={title}
                            loading="lazy"
                        />
                        <h2 className={css.title}>{title}</h2>
                    </div>
                </li>
            ))}
        </ul>
    )
}