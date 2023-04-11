import React, { useEffect, useState } from 'react';

const Search = ({ location }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('q');

      // working 
      console.log('this is query: ' + query);

      try {
        const response = await fetch(`/search?query=${query}`);
        const data = await response.json();

        if (response.ok) {
          console.log('response is okay');
          setResults(data);
          console.log(results);
        } else {
          console.log('error in fetch try');
          throw new Error(data.error);
        }
      } catch (err) {
        console.log('error in fetch: ' + err.message);
        console.error(err);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <>
      <h1>Search Results</h1>
      {results.map((result) => (
        <div key={result.recipe_id}>
          <h2>{result.recipe_title}</h2>
        </div>
      ))}
    </>
  );
};

export default Search;
