import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import './favorites.css'

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeFlix")
    setMovies(JSON.parse(myList) || [])
  }, [])

  function destroy(id) {
    let moviesFilter = movies.filter((movie) => {
      return (movie.id !== id)
    })

    setMovies(moviesFilter);
    localStorage.setItem("@primeFlix", JSON.stringify(moviesFilter));
    toast.success('Filme removido com sucesso');
  }

  return(
    <div className="my-movies">  
      <h1> Meus Filmes </h1>
      {movies.length === 0 && <span> Você não possui filmes salvos! </span>}

      <ul>
        {movies.map((movie) => {
          return(
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}> Ver detalhers </Link>
                <button onClick={() => destroy(movie.id)}> Excluir </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;