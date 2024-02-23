import React, { useEffect, useReducer } from "react";
import { getAll, getAllByTag, getAllTags } from "../../services/foodService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import { search } from "../../services/foodService";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import NotFound from "../../components/NotFound/NotFound";
const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload }; //return previous state
    case "TAGS_LOADED":
      return { ...state, tags: action.payload }; //return previous state
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;

  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]); //empty [] just once when opening the page, now we added searchTerm--is a dependecy, when it is changed it triggers

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound message={"reset the search"} />}
      <Thumbnails foods={foods} />
    </>
  );
}
