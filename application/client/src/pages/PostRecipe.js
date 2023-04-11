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
            <h3 align="center" class="w3-border-bottom w3-border-light-grey w3-padding-16 fa-2x">New Recipe</h3>
            <img src='image5.jpg' text-align='center' width='1120'> </img>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Chicken Alfredo" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="e.g., This easy Chicken Alfredo recipe includes golden pan-fried chicken breasts and tender noodles, coated in the most dreamy cream sauce ever!" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type="text" placeholder="e.g., 16 ounces dry fettuccine pasta" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Make the noodles: Bring a large pot of salted water to a boil. Add the fettuccine and cook until al dente according to package directions, usually 10 minutes. Reserve 1/2 cup of the cooking water, then drain well. Set aside." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Italian" />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <input type="file" id="imageUpload" name="imageUpload" accept="image/*"></input>
                    <Form.Control type="text" />
                </Form.Group>s

                <button class="w3-button w3-black w3-section " id="createBtn" type="submit">
                    <i class="fa fa-paper-plane"></i> Post Recipe!
                </button>
               
            </Form>
        </Container>
    </>
  )
}

export default PostRecipe