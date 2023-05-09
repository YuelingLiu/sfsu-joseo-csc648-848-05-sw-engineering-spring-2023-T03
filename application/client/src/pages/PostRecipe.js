import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

const PostRecipe = () => {
  // holds image uploaded name
  const [selectedFile, setSelectedFile] = useState('');
  const [recipeName, setRecipeName] = useState('');

  const [cookingTime, setCookingTime] = useState('');
  //dcookingTimeUnit, which holds the selected unit (minutes, hours, or days).
  const [cookingTimeUnit, setCookingTimeUnit] = useState('minutes');

  const [difficulty, setDifficulty] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();
    const errors = {};

    if (recipeName.trim() === '') {
      toast.warn("You didn't enter a recipe name", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log('Please enter a recipe name');
      return;
    }
  };

  // set our image name so we can display it
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0].name);
    } else {
      setSelectedFile('');
    }
  };

  const handleRecipeName = (e) => {
    setRecipeName(e.target.value);
    console.log('Checking recipeName', e.target.value);
  };

  const handleCookingTime = useCallback((e) => {
    setCookingTime(e.target.value);
  }, []);

  const handleCookingTimeUnit = useCallback((e) => {
    setCookingTimeUnit(e.target.value);
  }, []);

  const handleDescription = (e) => {
    setRecipeDescription(e.target.value);
  };
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleIngredients = (e) => {
    setIngredients(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3
            align="left"
            class="w3-border-bottom w3-border-light-grey w3-padding-16 fa-2x"
          >
            Create New Recipe
          </h3>
          <img
            src="image6.jpg"
            alt="Recipe"
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
          />

          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ marginTop: '18px' }}
            >
              <Form.Label>
                <strong>Recipe Name</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="e.g., Chicken Alfredo"
                style={{ width: '938px', height: '35px' }}
                value={recipeName}
                onChange={handleRecipeName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Cooking Time</strong>
              </Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  min="1"
                  step="1"
                  className="mr-2"
                  placeholder="30"
                  style={{ width: '100px' }}
                  value={cookingTime}
                  onChange={handleCookingTime}
                />
                <Form.Select
                  style={{ width: '150px' }}
                  value={cookingTimeUnit}
                  onChange={handleCookingTimeUnit}
                >
                  <option>minutes</option>
                  <option>hours</option>
                  <option>days</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Recipe Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g., This easy Chicken Alfredo recipe includes golden pan-fried chicken breasts and tender noodles, coated in the most dreamy cream sauce ever!"
                style={{ resize: 'vertical', width: '950px' }}
                value={recipeDescription}
                onChange={handleDescription}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Difficulty</strong>
              </Form.Label>
              <Form.Select
                style={{ width: '250px' }}
                value={difficulty}
                onChange={handleDifficulty}
              >
                <option value="">Select difficulty level</option>
                <option value="Easy">Beginner</option>
                <option value="Moderate">Intermediate</option>
                <option value="Hard">Advanced</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>
                <strong>Ingredients</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter ingredients separated by commas"
                style={{ width: '938px', height: '60px' }}
                value={ingredients}
                onChange={handleIngredients}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Instructions</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Hit enter after each step, we will automatically number the instructions for you."
                style={{
                  whiteSpace: 'pre-wrap',
                  width: '950px',
                }}
                onInput={(event) => {
                  // Clear any existing timeout
                  clearTimeout(event.target.timeout);
                  // Set a new timeout to execute the numbering code after a short delay
                  event.target.timeout = setTimeout(() => {
                    // Split the text into lines
                    const lines = event.target.value.split('\n');
                    // Remove any existing numbering from the lines
                    const unnumberedLines = lines.map((line) =>
                      line.replace(/^\d+\.\s+/, '')
                    );
                    // Create a new string with numbered lines
                    const numberedText = unnumberedLines
                      .map((line, index) => `${index + 1}. ${line}`)
                      .join('\n');
                    // Update the textarea with the numbered text
                    event.target.value = numberedText;
                  }, 250); // Delay the execution of the numbering code by 250 milliseconds
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                <strong>Category</strong>
              </Form.Label>
              <Form.Control
                as="select"
                style={{ width: '950px' }}
                value={category}
                onChange={handleCategory}
              >
                <option value="">Select a category</option>
                <option value="African">African</option>
                <option value="American">American</option>
                <option value="Asian">Asian</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                <option value="Greek">Greek</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Latin-American">Latin-American</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle-Eastern">Middle-Eastern</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="imageUpload" className="custom-file-upload">
                Choose image
              </label>
              <span style={{ marginLeft: '10px' }}>
                {selectedFile || 'No file chosen'}
              </span>
            </Form.Group>

            <Button
              style={{ marginBottom: '10px' }}
              size="md"
              variant="success"
              onClick={handlePost}
            >
              Post Recipe
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default PostRecipe;
