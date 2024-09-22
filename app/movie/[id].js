import { useRouter } from 'next/router';
import MovieDetails from '../../components/movieDetails';

export default function MovieDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    return <MovieDetails movieId={id} />;
}