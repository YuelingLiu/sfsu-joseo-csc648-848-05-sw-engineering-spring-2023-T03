import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/Cards/DashboardCard';

// MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Bootstrap 
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';

const Search = ({ location }) => {
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState([]);

  const [filter, setfilter] = React.useState('');

  const handleChange = (event) => {
    setfilter(event.target.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('query');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/search?query=${query}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data.results);
          console.log("Results:", results);

          setTitle(results.recipe_title);
          console.log("Recipe title:", title);

        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [location.search]);


  const titleSearch = results.recipe_title
  return (
    <>
      <Container>
        <Row>
          <Col xs={5} sm={8}>
          {results.map((result, index) => (
            <div key={index}>
              <h1 sx={{ fontWeight: 'bolder' }}>{result.recipe_title}</h1>
            </div>
          ))}
          </Col>

          <Col xs={7} sm={4}>
            <div className="d-flex align-items-center">
              <h3>Sort by:</h3>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={filter}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ height: '32px', lineHeight: '30px' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Lastest</MenuItem>
                  <MenuItem value={20}>Popular</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Col>
        </Row>

        {results.length > 0 ? (
          results.map((result) => <DashboardCard result={result} />)
        ) : (
          <p>No results found.</p>
        )}
      </Container>
    </>
  );
};

export default Search;
