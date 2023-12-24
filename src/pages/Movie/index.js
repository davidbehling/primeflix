import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import api, { KEY, LANGUAGE, IMAGE_URL } from '../../services/api';
import './movie.css';

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: KEY,
          language: LANGUAGE
        }
      }).then((response) => {
        setMovie(response.data);
        setLoading(false);
      }).catch(() => {
        navigate("/", { replace: true });
        return;
      })
    }

    loadMovie();
    
    return () => {
      console.log('COMPONENTE DESMONTADO');
    }
  }, [navigate, id])

  function saveMovie() {
    const mylist = localStorage.getItem("@primeFlix");

    let saveMovies = JSON.parse(mylist) || [];

    const hasMovie = saveMovies.some((saveMovie) => saveMovie.id === movie.id);

    if (hasMovie) {
      toast.warn('Esse filme já esta na sua lista');
      return;
    }

    saveMovies.push(movie);

    localStorage.setItem("@primeFlix", JSON.stringify(saveMovies));
    toast.success('Filme salvo com sucesso!');
  }

  if (loading) {
    return(
      <div className="loading">
        <h2> Carregando filmes...</h2>
      </div>
    )
  }

  return(
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img src={`${IMAGE_URL}${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong> Avaliação: {movie.vote_avarenge} / 10 </strong>

      <div className="buttons">
        <button onClick={saveMovie}> Salvar </button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}> Trailer </a>
        </button>
      </div>
    </div>
  )
}

export default Movie;