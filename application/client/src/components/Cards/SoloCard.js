import React from 'react'

// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function SoloCard() {
  return (
    <>
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Row>
                        <Col xs={1} sm={6} xl={4}>
                            <Card.Img variant="top" src="favicon.ico" />
                        </Col>
                        <Col xs={3} sm={6} xl={4}>
                            <Row className='rightSideRow'><p>Ratings</p></Row>
                            <Row className='rightSideRow'><p>Author</p></Row>
                        </Col>
                    </Row>

                    {/* need padding to the left */}
                    <Row className='bottomRow'>
                        <p className='bottomRow'>Title</p>
                    </Row>
                    <Row className='bottomRow'>
                        <p className='bottomRow'>Brief Description</p>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default SoloCard