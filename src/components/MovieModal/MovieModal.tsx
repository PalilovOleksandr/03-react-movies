import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie: { backdrop_path, title, overview, release_date, vote_average }, onClose }: MovieModalProps) {
    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true">
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt={title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <p>
                        <strong>Release Date:</strong> {release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}