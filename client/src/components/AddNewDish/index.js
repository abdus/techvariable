import React from "react";
import {
  TextField,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import styled from "styled-components";
import XHR from "../../modules/xhr";
import { GlobalDishDataContext as FoodDataContext } from "../../contexts/";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  & > * {
    margin-top: 20px;
  }

  & input {
    background-color: #fff;
  }
`;

const AddNewDish = (props) => {
  const formRef = React.useRef();
  const [foodType, setFoodType] = React.useState([]);
  const xhr = new XHR();
  const foodDataContext = React.useContext(FoodDataContext);

  return (
    <div style={{ padding: "2rem 1rem", background: "#f7f7f7" }}>
      <Container size="lg">
        <Typography variant="h5" gutterBottom>
          Add a New Dish
        </Typography>
        <StyledForm
          autoComplete="off"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current);
            console.log(formData);
            const data = {};
            for (let f of formData) {
              if (f[0] === "type") f[1] = f[1]["split"](",");
              data[f[0]] = f[1];
            }

            console.log(data);
            xhr
              .createDish(data)
              .then(() => {
                props.visiblityHandler(false);
                foodDataContext.refreshData();
              })
              .catch((err) => {
                console.log(err.message);
              });
          }}
        >
          <TextField
            label="Name of the Dish"
            variant="outlined"
            name="name"
            required
          />
          <TextField label="Format" variant="outlined" name="format" required />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            name="price"
            required
            inputProps={{
              min: 100,
              max: 2000,
            }}
          />

          <FormControl variant="outlined">
            <InputLabel>Food Type</InputLabel>
            <Select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              label="Food Type"
              name="type"
              multiple
              required
            >
              <MenuItem value="veg">Veg</MenuItem>
              <MenuItem value="egg">Egg</MenuItem>
              <MenuItem value="chicken">Chicken</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Occasion"
            type="text"
            variant="outlined"
            name="occasion"
            required
          />
          <ButtonGroup color="primary">
            <Button type="submit">Add</Button>
            <Button
              type="reset"
              color="secondary"
              onClick={() => props.visiblityHandler(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </StyledForm>
      </Container>
    </div>
  );
};

export default AddNewDish;
