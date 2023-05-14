import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import FilterBar from '../components/filterbar/Filterbar';

const PostRecipe = () => {
  const history = useHistory();
  // holds image uploaded name
  const [selectedFile, setSelectedFile] = useState('');
  const [recipeName, setRecipeName] = useState('');

  const [cookingTime, setCookingTime] = useState('');

  const [difficulty, setDifficulty] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  // const [step, setStep] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

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

    if (instructions.length === 0) {
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

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      console.log('post recipe NOT successfully');
      toast.error('Post recipe failed', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success('post recipe successfully 🚀👏', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log('post recipe successfully');
      history.push('/');
    }

    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', recipeName);
      formData.append('cooking_time', cookingTime);
      formData.append('description', recipeDescription);
      formData.append('difficulty', difficulty);
      formData.append('ingredients', ingredients);
      formData.append('instructions', instructions);
      formData.append('category', category);

      // change this to if statement
      if (images) {
        formData.append('photo_url', images);
      }
      console.log('This is recipe images: ' + images);

      postRecipe(formData)
        .then((recipeData) => {
          console.log('DATA: ', recipeData);
        })
        .catch((error) => {
          console.log('ERROR: ', error.message);
        });
    } catch (error) {
      console.log('Error message: ' + error.message);
    }
  };

  const postRecipe = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/recipe/post-recipe`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        // console.log('response not ok');
        // toast.error('Post recipe failed!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        throw new Error('Response ERROR');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // toast.error('Post recipe failed!', {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      console.error('Error while registering user:', error.message);
      throw error;
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

  // const handleCookingTimeUnit = (e) => {
  //   setCookingTimeUnit(e.target.value);
  // };

  const handleDescription = (e) => {
    setRecipeDescription(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

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
    console.log('Checking add button gets triggered or not ');
    setIngredients([...ingredients, '']);
    console.log(ingredients);
  };
  useEffect(() => {
    console.log('Updated ingredients:', ingredients);
  }, [ingredients]);

  const handleInstructionsChange = (event, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = event.target.value;
    setInstructions(newInstructions);
  };

  const handleDeleteInstruction = (index) => {
    console.log('YoU clicked the delete instruction icon');
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    console.log('handle add instruction button ');
    const newInstruction = {
      step: instructions.length + 1,
      text: '',
    };
    console.log('what is new instructions,', newInstruction);
    setInstructions([...instructions, newInstruction]);
  };
  useEffect(() => {
    console.log('Updated instructions:', instructions);
  }, [instructions]);

  const handleStepChange = (event, index) => {
    const newInstructions = [...instructions];
    const newStep = parseInt(event.target.value);

    if (isNaN(newStep) || newStep === '') {
      toast.warn('Uh oh! The step value must be a number.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    newInstructions[index].step = newStep;
    console.log(
      'what are the new instruction',
      (newInstructions[index].step = newStep)
    );
    setInstructions(newInstructions);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={9} sm={4} xs={12}>
            <h3 align="center">Add New Recipe</h3>
            <img
              src="image8.jpg"
              alt="Recipe"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={9} sm={4} xs={12}>
            <Form
              style={{
                backgroundColor: '#f4fffb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Form.Group
                controlId="formBasicEmail"
                className="mb-3"
                style={{ marginTop: '1px', width: '100%', marginLeft: '2%' }}
              >
                <Form.Label>
                  <strong>Recipe Name</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="e.g., Chicken Alfredo"
                  style={{ height: '35px', width: '80%' }}
                  value={recipeName}
                  required={true}
                  onChange={handleRecipeName}
                />
                <Form.Group />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: '100px', width: '80%' }}
                    placeholder="e.g., This easy Chicken Alfredo recipe includes golden pan-fried chicken breasts and tender noodles, coated in the most dreamy cream sauce ever!"
                    value={recipeDescription}
                    required={true}
                    onChange={handleDescription}
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
                      style={{ width: '15%' }}
                      value={cookingTime}
                      required={true}
                      onChange={handleCookingTime}
                    />
                    <option
                      value="Minutes "
                      style={{ marginLeft: '5px', textAlign: 'center' }}
                    >
                      Minutes
                    </option>
                    {/* style={{ width: '18%' }}
                    onChange={handleCookingTimeUnit} */}
                    {/* <option>minutes</option> */}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <strong>Difficulty</strong>
                  </Form.Label>
                  <Form.Select
                    style={{ width: '30%' }}
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
                    <p
                      style={{
                        color: 'gray',
                        fontSize: '14px',
                        width: '80%',
                      }}
                    >
                      Enter one ingredient per line. Include the quantity (i.e.
                      2 cups flour, 1 tablespoon sugar). If an ingredient
                      requires special preparation, such as sifting or chopping,
                      include this in the ingredient line (i.e. 1 cup flour,
                      sifted)
                    </p>
                  </Form.Label>

                  {ingredients.map((ingredient, index) => (
                    <div className="d-flex mb-2" key={index}>
                      <Form.Control
                        as="textarea"
                        placeholder={`Ingredient ${index + 1}`}
                        style={{ width: '50%', height: '35px' }}
                        value={ingredient}
                        onChange={(event) =>
                          handleIngredientsChange(event, index)
                        }
                      />
                      <Button
                        variant="dark"
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          color: 'hsl(0, 83%, 39%)',
                        }}
                        onClick={() => handleDeleteIngredient(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
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

                <Form.Group controlId="formBasicPassword" className="mb-3 ">
                  <Form.Label>
                    <strong>Instructions</strong>
                    <p
                      style={{
                        color: 'gray',
                        fontSize: '14px',
                        width: '80%',
                      }}
                    >
                      Enter step with its instruction, e.g Step 1: Cook the
                      spaghetti according to package instructions until al
                      dente. Reserve 1 cup of the pasta water, then drain the
                      spaghetti.
                    </p>
                  </Form.Label>

                  {instructions.map((instruction, index) => (
                    <div className="d-flex mb-2" key={index}>
                      <div
                        style={{
                          display: 'flex',
                          width: '10%',
                          alignItems: 'center',
                        }}
                      >
                        <Form.Label>
                          <strong>Step</strong>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          placeholder={`${index + 1}`}
                          value={instruction.step}
                          required={true}
                          onChange={(e) => handleStepChange(e, index)}
                          style={{
                            height: '48px',
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          width: '90%',
                          marginLeft: '0.5px',
                          alignItems: 'center',
                        }}
                      >
                        <Form.Control
                          as="textarea"
                          placeholder={`In a large skillet, cook the pancetta or bacon over medium heat until crisp.${
                            index + 1
                          }`}
                          style={{
                            width: '70%',
                            height: '50px',
                            marginLeft: '2px',
                          }}
                          value={instruction.text}
                          required={true}
                          onChange={(event) =>
                            handleInstructionsChange(event, index)
                          }
                        />
                        <Button
                          variant="dark"
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            color: 'hsl(0, 83%, 39%)',
                          }}
                          onClick={() => handleDeleteInstruction(index)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="dark"
                    onClick={handleAddInstruction}
                    style={{
                      marginTop: '10px',
                      backgroundColor: 'white',
                      color: 'Green',
                    }}
                  >
                    Add Instruction
                  </Button>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>
                    <strong>Category</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    style={{ width: '40%' }}
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
                    style={{ display: 'none', marginTop: '10px' }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="imageUpload" className="custom-file-upload">
                    Choose image
                  </label>
                  <span style={{ marginLeft: '10px' }}>
                    {selectedFile || 'No file chosen'}
                  </span>
                </Form.Group>
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
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default PostRecipe;
