import React, { useState } from 'react'
import Search from './component/Search'
import axios from 'axios'
import Results from './component/Results'
import Popup from './component/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  
  const apiurl = "https://www.omdbapi.com/?i=tt3896198&apikey=b6c59b5c";
  const search = (e) => {
    if(e.key === "Enter"){
      axios(apiurl + "&s=" + state.s).then(({data})=>{
        let results = data.Search;
        setState(prevState => {
          return { ...prevState, results: results}
        })
      })
    }
  }
  
  const handleInput= (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s}
    });
    
  }  

  const openPopup = (id) =>{
    let apiUrlPopup = "https://www.omdbapi.com/";
    let apikey = "&apikey=b6c59b5c";
    axios(apiUrlPopup + "?i="+ id + apikey).then(({data}) =>{
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () =>{
    setState(prevState => {
      return { ...prevState, selected: {}}
    })
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search 
           handleInput={handleInput}
           search = {search}
        />
        <Results 
          results={state.results}
          openPopup ={openPopup}
        />
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
