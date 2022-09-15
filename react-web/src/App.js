import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e) =>{
       e.preventDefault();
       try{
        const response = await axios.post("http://localhost:5000/search")
        const data = response.data;
        console.log("data", data)
        setSearchResults(data)
     
        if("product" in data){
          setSearchResults(data)
          console.log('yes data')
        }else{
          setNotFound(true);
        }
       }catch(err){
        console.log(err);
       }
  }
  console.log(searchResults)
  console.log(notFound)

  return (
    <div >
      <button onClick={handleSearch} >Search</button>
      <div>
        {searchResults && searchResults.map((result)=>{
          return <li>{result.product}</li>
        })}
      </div>
    </div>
  );
}

export default App;
