import React from "react";
import style from './recipe.module.css';
   
const Recipe = ({recipename,description,ingredients,category,productImage}) =>{
   
    return(
        <div className={style.recipe}>
            <h1>{recipename}</h1>     
            <h4>Ingredients : </h4>
            <h5>{ingredients}</h5>
            <h4>Method of cooking: </h4>
            <h5>{description}</h5>

            

            <img width ={250} height ={250} src={productImage} />
          
        </div>

    );
  
}
export default Recipe;