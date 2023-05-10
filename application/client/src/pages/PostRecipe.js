import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

  const handlePostRecipe = async (e) => {
    e.preventDefault();
    const errors = {};

    if (recipeName.trim() === '') {
      toast.warn(
        'Oops! It looks like you forgot to enter a name for your recipe',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      console.log('Please enter a recipe name');
      return;
    }

    if (cookingTime.trim() === '') {
      toast.warn(
        'Oops! It looks like you forgot to select a cooking time for your recipe',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    if (cookingTimeUnit.trim() === '') {
      toast.warn('Please choose a cooking time unit for your recipe', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (recipeDescription.trim() === '') {
      toast.warn(
        'Uh oh! Looks like you forgot to add a brief description to your recipe',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    if (difficulty.trim() === '') {
      toast.warn(
        "Hey there! It looks like you haven't selected a difficulty level for your recipe! ",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    if (ingredients.length === 0) {
      toast.warn(
        'Uh oh! Looks like you forgot to add ingredients to your recipe ',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    if (instructions.trim() === '') {
      toast.warn(
        'Uh oh! It looks like you forgot to add instructions to your recipe ',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    if (category.trim() === '') {
      toast.warn(
        'Uh oh! It looks like you forgot to select a category for your recipe ',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
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

  const handleCookingTime = (e) => {
    setCookingTime(e.target.value);
  };

  const handleCookingTimeUnit = (e) => {
    setCookingTimeUnit(e.target.value);
  };

  const handleDescription = (e) => {
    setRecipeDescription(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  // const handleIngredients = (e) => {
  //   setIngredients(e.target.value);
  // };

  const handleIngredientsChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    console.log('YoU clicked the trash icon');
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleInstructions = (e) => {
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
              className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3"
              controlId="formBasicEmail"
              style={{ marginTop: '18px' }}
            >
              <div className="w-100 w-md-50 mb-3 mb-md-0">
                <Form.Label>
                  <strong>Recipe Name</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="e.g., Chicken Alfredo"
                  style={{ height: '35px', width: '350px' }}
                  value={recipeName}
                  required={true}
                  onChange={handleRecipeName}
                />

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
                    style={{ width: '150px' }}
                    value={cookingTime}
                    required={true}
                    onChange={handleCookingTime}
                  />
                  <Form.Select
                    style={{ width: '200px' }}
                    value={cookingTimeUnit}
                    onChange={handleCookingTimeUnit}
                  >
                    <option>minutes</option>
                    <option>hours</option>
                    <option>days</option>
                  </Form.Select>
                </div>
              </div>
              <div className="w-100 w-md-50">
                <Form.Label>
                  <strong>Description</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  placeholder="e.g., This easy Chicken Alfredo recipe includes golden pan-fried chicken breasts and tender noodles, coated in the most dreamy cream sauce ever!"
                  value={recipeDescription}
                  required={true}
                  onChange={handleDescription}
                />
              </div>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
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
                  required={true}
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
            </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Recipe Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: 'vertical', width: '950px' }}
                value={recipeDescription}
                onChange={handleDescription}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Difficulty</strong>
              </Form.Label>
              <Form.Select
                style={{ width: '350px' }}
                value={difficulty}
                onChange={handleDifficulty}
              >
                <option value="">Select difficulty level</option>
                <option value="Easy">Beginner</option>
                <option value="Moderate">Intermediate</option>
                <option value="Hard">Advanced</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3 ">
              <Form.Label>
                <strong>Ingredients</strong>
                <p style={{ width: '350px', color: 'gray', fontSize: '14px' }}>
                  Enter one ingredient per line. Include the quantity (i.e.
                  cups, tablespoons) and any special preparation (i.e. sifted,
                  softened, chopped). Use optional headers to organize the
                  different parts of the recipe (i.e. Cake, Frosting, Dressing).
                </p>
              </Form.Label>

              <div className="d-flex">
                <Form.Control
                  as="textarea"
                  placeholder="add ingredients . . . "
                  //  placeholder={`Ingredient ${index + 1}`}
                  style={{ width: '350px', height: '35px' }}
                />
                <Button
                  variant="dark"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    color: 'hsl(0, 83%, 39%)',
                  }}
                >
                  <FaTrash onClick={handleDeleteIngredient} />
                </Button>
              </div>

              {ingredients.map((ingredient, index) => (
                <Form.Control
                  key={index}
                  as="textarea"
                  placeholder="add ingredients . . . "
                  //  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(event) => handleIngredientsChange(event, index)}
                  style={{ width: '350px', height: '35px', marginTop: '5px' }}
                />
              ))}
              <Button
                variant="dark"
                onClick={handleAddIngredient}
                style={{
                  marginTop: '10px',
                  backgroundColor: 'white',
                  color: 'Green',
                }}
              >
                Add Ingredient
              </Button>
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
                onChange={handleInstructions}
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
              Reci
              size="md"
              variant="success"
              onClick={handlePostRecipe}
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
