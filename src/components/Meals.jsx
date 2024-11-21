import React from "react";
import MealItem from "./MealItem";
import UseHttp from "../hooks/UseHttp.js";
import FetchError from "./FetchError.jsx";

const config = { method: "GET" };

function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = UseHttp("http://localhost:3000/meals", config, []);

  if (isLoading) {
    return <p className="center">fetching meals...</p>;
  }

  if (error) {
    return <FetchError title="Failed to fetch meals..." msg={error} />
  }
  
  return (
    <ul id="meals">
      {/* Add your meal items here */}
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
