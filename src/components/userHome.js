import React, { Component, useEffect, useState } from "react";
import Recipe from './Recipe';
import { useParams } from "react-router-dom";
export default function UserHome({ recipe }) {

  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  useEffect(() => {
       getRecipe();
  }, [query]);

  const getRecipe= async () => {

    const response =await fetch (`https://kitchenrecipemanagement.onrender.com/getRecipe?search=${query}`,{
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "searchData");
        console.log(data.data);
        recipe=data.data;
        console.log(recipe);
        setRecipes(data.data);
      });
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    
  }
  return (
    <div>
      <button onClick={logOut} style={{float: "right", marginRight:"20px", marginTop:"13px" }} className="btn btn-primary" >
            Log Out
      </button>
        <h3>kitchen Recipe Management</h3>
         <div>
 
          <br />
		   </div>
       <div className="App">
        <form className="search-form" onSubmit={getSearch}  >
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
        
      </form>
      <div className="recipes">
       {recipes.map(recipe => (
          <Recipe
           recipename={recipe.recipename}
            description={recipe.description}
            productImage={recipe.productImage}
            ingredients={recipe.ingredients}
            image={recipe.image}
          />
        ))}
      </div>
    </div>
    </div>
  );
}