import React, {useEffect, useState} from 'react'

const Search = ({ location }) => {
    const [results, setResults] = useState([]);
    
  
    useEffect(() => {
      const fetchResults = async () => {
        const query = new URLSearchParams(location.search).get('query');
        try {
          console.log("query in search: " + query);
          const response = await fetch(`http://ec2-54-183-83-77.us-west-1.compute.amazonaws.com:3000/search?query=${query}`);
          const data = await response.json();
  
          if (response.ok) {
            console.log("response" + response.json);
            setResults(data);
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
        {results.map((result) => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </>
    );
  };
  
  export default Search;