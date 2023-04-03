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
            <Form>
                <h3 align="center" class="w3-border-bottom w3-border-light-grey w3-padding-16 fa-2x">New Recipe</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Recipe Description</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Recipe Ingredients</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Ingredients" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Recipe Instructions</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Instructions" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Category ex: American, Mexican, Italian, Chinese" />
                </Form.Group>
        
                <button class="w3-button w3-black w3-section " id="createBtn" type="submit">
                    <i class="fa fa-paper-plane"></i> Post Recipe!
                </button>
               
            </Form>
        </Container>
    </>
  )
}

export default PostRecipe