import React, {useEffect, useState} from 'react'
import DashboardCard from '../components/Cards/DashboardCard'

const Search = ({ location }) => {
    const [results, setResults] = useState([]);
    
    useEffect(() => {
      const fetchResults = async () => {
        const query = new URLSearchParams(location.search).get('query');
        try {
          const response = await fetch(`${process.env.REACT_APP_REQ_URL}/search?query=${query}`);
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
            <DashboardCard 
              result={result}
            />
          
          ))
        ) : (
          <p>No results found.</p>
        )}
      </>
    );
  };
  
  export default Search;
