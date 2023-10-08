import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from 'react-paginate';
import { useRef } from "react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
export default function AdminHome({ userData }) {

  
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(5);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();
  const [showForm, setShowForm] =  useState(false);
  const [recipename, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  //const [productImage, setImage] = useState("");

  const [image, setImage] = useState("");
  
  useEffect(() => {
    currentPage.current=1;

    getPaginatedUsers();
  }, []);


  
  const getAllUser = () => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };



//logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    console.log(recipename, description, ingredients, category, productImage);

    fetch("http://localhost:5000/addRecipe", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          recipename,
          description,
          ingredients,
          category,
          productImage
  //base64: productImage
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "RecipeDetail");
          if (data.status == "ok") {
            alert("Recipe added Successfully");
          } else {
            alert("Something went wrong");
          }
          window.location.reload(false);
        });
  
  
  }

  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
   currentPage.current=e.selected+1;
    getPaginatedUsers();
   

  }
  function changeLimit(){
    currentPage.current=1;
    getPaginatedUsers();
  }

  function getPaginatedUsers(){
    fetch(`http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result)
        
       
      });
  }

  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result); 
      //  setImage(reader.result);
        setProductImage(reader.result)
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    };
}

function uploadImage() {
  fetch("http://localhost:5000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          base64: image
      })
  }).then((res) => res.json()).then((data) => console.log(data))
}

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Welcom Admin</h3>
        <br></br>
        <button  onClick={logOut} style={{float: "right", marginRight:"15px", marginTop:"10px", marginBottom:"10px" }} className="btn btn-primary">
          Log Out
        </button>
        <table style={{ width: 500 }}>
         <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
        <input placeholder="Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Set Limit</button>
        <br></br>
        
        


        <div class="col-8">
          <React.Fragment>
{
  showForm?   (  <form onSubmit={handleSubmit}>
    
  <div class="row g-3">
    <div class="col-12">
      <label>Recipe Name</label>
      <input type="text" name="name" id="name" class="form-control" 
      onChange={(e) => setRecipeName(e.target.value)} required></input>
    </div>
    
    <div class="col-12">
      <label >Description</label>
      <textarea name="description" id="description" class="form-control" cols="30" rows="4" 
      onChange={(e) => setDescription(e.target.value)}></textarea>
    </div>

    <div class="col-12">
      <label>Ingredients</label><br></br>
      <small>Example: Ice</small>
      <div class="ingredientList">
        <div class="ingredeintDiv mb-1">
          <input type="text" name="ingredients" class="form-control" 
          onChange={(e) => setIngredients(e.target.value)}></input>
        </div>
      </div>
    </div>

  
    <div class="col-12">
      <button type="button" class="btn btn-outline-primary" id="addIngredientsBtn">+ Ingredient</button>
    </div>

    <div class="col-12">
      <label>Select Category</label>
      <select class="form-select form-control" name="category" aria-label="Category" 
      onChange={(e) => setCategory(e.target.value)}>
        <option selected>Select Category</option>
        <option value="Thai">Thai</option>
        <option value="American">American</option>
        <option value="Chinese">Chinese</option>
        <option value="Mexican">Mexican</option>
        <option value="Indian">Indian</option>
      </select>
    </div>

    <div class="col-12">
      <label>Product Image</label>
      <input type="file" class="form-control" name="image" accept="image/*" 
     // onChange={(e) => setProductImage(e.target.value)}
     onChange={covertToBase64}></input>

     {image =="" || image ==null? "":<img width ={100} height ={100} src={image}/>  }
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Submit Recipe</button>
    </div>

  </div>

</form>):(
   
   <button onClick={()=>setShowForm(true)} style={{ marginRight:"15px", marginTop:"10px", marginBottom:"10px" }} className="btn btn-primary">
   Add Recipe
 </button>

)
}
    </React.Fragment>
  </div>
      </div>
    </div>
  );
}