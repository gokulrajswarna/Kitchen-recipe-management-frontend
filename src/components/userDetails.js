import React, { Component, useEffect, useState } from "react";
import AdminHome from "./adminHome";

import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://kitchenrecipemanagement.onrender.com/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
      getAllRecipe();
  }, []);

  const getAllRecipe= () => {
    
    fetch("https://kitchenrecipemanagement.onrender.com/getAllRecipe", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "recipeData");
      
        setRecipe(data.data);
      
     console.log(data);
      });
  };

  return admin ? <AdminHome /> : <UserHome recipe={recipe} />;
}