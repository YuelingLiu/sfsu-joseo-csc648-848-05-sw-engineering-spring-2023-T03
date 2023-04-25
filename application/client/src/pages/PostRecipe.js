import React from 'react'
import { Link } from 'react-router-dom'

// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

const PostRecipe = () => {
    return (
        <>
            <Container>
                <h3 align="left" class="w3-border-bottom w3-border-light-grey w3-padding-16 fa-2x">New Recipe</h3>
                <img src='image6.jpg' text-align='center' max-width='100%' height='auto' display='block' />


                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><strong>Recipe Name</strong></Form.Label>
                        <Form.Control type="text" placeholder="e.g., Chicken Alfredo" style={{ width: "950px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><strong>Description</strong></Form.Label>
                        <Form.Control style={{ resize: "vertical", width: "950px" }} type="text" placeholder="e.g., This easy Chicken Alfredo recipe includes golden pan-fried chicken breasts and tender noodles, coated in the most dreamy cream sauce ever!" />
                    </Form.Group>


                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label><strong>Ingredients</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter ingredients separated by commas" style={{ width: "950px" }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><strong>Instructions</strong></Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="e.g., Make the noodles: Bring a large pot of salted water to a boil. Add the fettuccine and cook until al dente according to package directions, usually 10 minutes. Reserve 1/2 cup of the cooking water, then drain well. Set aside." style={{ whiteSpace: 'pre-wrap', width: '950px' }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><strong>Category</strong></Form.Label>
                        <Form.Control type="text" placeholder="e.g., Italian" style={{ width: "950px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <input type="file" id="imageUpload" name="imageUpload" accept="image/*"></input>
                    </Form.Group>

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button style={{ marginBottom: '10px' }} size="md" variant="success">Post Recipe</Button>
                    </Link>

                </Form>
            </Container>
        </>
    )
}

export default PostRecipe
