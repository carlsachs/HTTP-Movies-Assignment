import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

import UpdateMovie from "./Movies/UpdateMovie"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => "there's an error here pal");
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={() => 
        <MovieList  movieList={movieList} setMovieList={setMovieList}/>}/>
        <MovieList movies={movieList} />
        <Route path="/update-movie/:id" render={props =>
          <UpdateMovie {...props} movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList}/>}/>
      <Route path="/movies/:id">
        <Movie movieList={movieList} setMovieList={setMovieList} addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
