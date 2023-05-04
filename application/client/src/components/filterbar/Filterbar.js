import React, { useState } from 'react';

// MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Bootstrap 
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';

const Filterbar = ({title}) => {

  const [filter, setfilter] = useState('');

  const handleChange = (event) => {
    setfilter(event.target.value);
  };


  console.log('this is title: ',title.recipe_title)


  return (
    <>
      <Container  style={{ marginBottom: '20px'}}>
        <Row>
          <Col xs={5} sm={8}>
          {title.map((result, index) => (
            <div key={index}>
              <h1 sx={{ fontWeight: 'bolder' }}>{result.recipe_title}</h1>
            </div>
          ))}
          </Col>

          <Col xs={7} sm={4}>
            <div className="d-flex align-items-center" style={{ justifyContent: 'flex-end' }} >
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
      </Container>
    </>
  )
}

export default Filterbar