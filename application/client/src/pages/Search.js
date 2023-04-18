import React, {useEffect, useState} from 'react'

const Search = ({ location }) => {
    const [results, setResults] = useState([]);
    
    useEffect(() => {
      const fetchResults = async () => {
        const query = new URLSearchParams(location.search).get('query');
        try {
          const response = await fetch(`${process.env.REACT_APP_REQ_URL}search?query=${query}`);
          const data = await response.json();

          if (response.ok) {
            setResults(data.results);
          } else {
            throw new Error(data.error);
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchResults();
    }, [location.search]);
  
    return (
      <>
        <h1>Search Results</h1>
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.recipe_id}>
              <h2>{result.recipe_title}</h2>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </>
    );
  };
  
  export default Search;
