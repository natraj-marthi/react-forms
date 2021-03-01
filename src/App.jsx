import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Container,
  Card,
  CardBody,
  CardHeader,
  Label,
  Alert,
} from "reactstrap";
import FormErrors from "./components/Errors";
import { validate } from "./lib/validator";

function App() {
  const [errors, setErrors] = useState({
    name: [],
    age: [],
  });

  const [formInputs, setFormInputs] = useState({
    name: "",
    age: 18,
  });

  const [showErrorAlert, setErrorAlert] = useState(false);
  const [showSuccessAlert, setSuccessAlert] = useState(false);

  const handleNameChange = (evt) => {
    evt.preventDefault();
    const rules = [
      {
        error: "Required",
        test: (string) => {
          console.log(string);
          return string.length > 0;
        },
      },
      {
        error: "Minimum 3 characters",
        test: (string) => string.length >= 3,
      },
      {
        error: "Maximum 20 characters",
        test: (string) => string.length <= 20,
      },
      {
        error: "Alphabets only",
        test: (string) => /[A-Za-z]/.test(string),
      },
    ];
    setErrors({ ...errors, name: validate(evt.target.value, rules) });
    setFormInputs({
      ...formInputs,
      name: evt.target.value,
    });
  };

  const handleAgeChange = (evt) => {
    evt.preventDefault();

    const rules = [
      {
        error: "Required",
        test: (string) => string.length > 0,
      },
      {
        error: "Numeric only",
        test: (string) => !isNaN(parseInt(string)),
      },
      {
        error: "Minimum 18",
        test: (string) => !isNaN(parseInt(string)) && parseInt(string) >= 18,
      },
      {
        error: "Maximum 35",
        test: (string) => !isNaN(parseInt(string)) && parseInt(string) <= 35,
      },
    ];

    setErrors({ ...errors, age: validate(evt.target.value, rules) });
    setFormInputs({
      ...formInputs,
      age: evt.target.value,
    });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const hasErrors = Object.keys(errors).some((key) => errors[key].length > 0);
    if (hasErrors || formInputs.name === "") {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
      return;
    }
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);
    return;
  };

  console.log(errors);

  return (
    <Container className="w-100 d-flex justify-content-center">
      <Card className="border-0 mt-4 shadow-sm form-card">
        <CardHeader>
          <h4 className="m-0 p-0 text-center">Player Form</h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleFormSubmit}>
            {showErrorAlert && (
              <Alert color="danger">Your form is not valid.</Alert>
            )}
            {showSuccessAlert && (
              <Alert color="success">Your form is valid.</Alert>
            )}
            <FormGroup>
              <Label htmlFor="name-input">Name:</Label>
              <Input
                id="name-input"
                onChange={handleNameChange}
                placeholder="Player Name"
              />
              {errors.name.length > 0 && <FormErrors errors={errors.name} />}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="age-input">Age:</Label>
              <Input
                id="age-input"
                onChange={handleAgeChange}
                placeholder="Age"
              />
              {errors.age.length > 0 && <FormErrors errors={errors.age} />}
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default App;
