import React from 'react'
import PopularDIshesCards from '../Cards/PopularDIshesCards'
import './Categories.css'

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Categories() {
  const categoryList = ['Mexican', 'Italian', 'American', 'Chinese']
  return (
    <>
      <Container>
        <Row>
            <Col xl={12}>
              <h2 className='title'>Popular Dishes</h2>
            </Col>
        </Row>

        <Row className="d-flex justify-content-center">
            {categoryList.map(category => (
                <PopularDIshesCards  category={category} />
            ))}
        </Row>
      </Container>

    </>
  )
}

export default Categories