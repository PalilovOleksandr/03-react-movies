import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import { useEffect } from "react";

interface MovieModalProps {
    movie: Movie;
    onClose: (movie: Movie | null) => void;
}

export default function MovieModal({ movie: { backdrop_path, title, overview, release_date, vote_average }, onClose }: MovieModalProps) {
    const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose(null);
        }
    };
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose(null);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);
    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClose}>
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={() => onClose(null)}>
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