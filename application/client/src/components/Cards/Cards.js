import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './SoloCard';
// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Cards() {
  return (
    <>
        <Container className='searchRow'>
            <Row>
                <Col xs={3} sm={3} xl={4}></Col>
                <Col xs={1} sm={4} xl={4}>
                    <Card />
                </Col>
                <Col xs={3} sm={4} xl={4}>
                    <Card />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Cards