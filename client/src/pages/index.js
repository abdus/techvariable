import React from "react";
import { GlobalDishDataContext } from "../contexts";
import { Grid, Container, Slider, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import FoodCard from "../components/FoodCard";
import AccordionWrapper from "../components/Accordion";
import CheckboxWrapper from "../components/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import Loader from "../components/Loader";
import AddNewDish from "../components/AddNewDish";
import XHR from "../modules/xhr";

/** Filter Received Data
 * data = [{
 *    name: String,
 *    price: Number,
 *    format: String,
 *    occasion: string
 * }]
 *
 * filters|f = {
 *    price: Array(2),
 *    occasion: Array(variable),
 *    format: Array(variable),
 * }
 */

function filterData(data = [], f = {}) {
  let arr = [];

  for (let d in data) {
    const item = data[d];

    if (item.price >= f.price[0] && item.price <= f.price[1]) {
      if (f.format.length === 0 && f.occasion.length === 0) {
        arr.push(item);
      } else if (
        f.format.includes(item.format) ||
        f.occasion.includes(item.occasion)
      ) {
        arr.push(item);
      }
    }
  }

  return arr;
}

const StyledTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #efefef;
  padding: 0 1rem 1rem 1rem;
  text-transform: uppercase;
`;

function getUniqueValue(arr, property) {
  const result = [];
  for (let i of arr) {
    result.push(i[property]);
  }

  return [...new Set(result)];
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 3000,
  },
}));

function Index() {
  const [foodData, setFoodData] = React.useState(null);
  const [filteredFoodData, setFilteredFoodData] = React.useState(null);
  const [showCreateWindow, setShowCreateWindow] = React.useState(null);
  const [filters, setFilters] = React.useState({
    price: [200, 1900],
    format: [],
    occasion: [],
  });

  // refs
  const formFormat__ref = React.useRef();
  const formOccasion__ref = React.useRef();

  const xhr = new XHR();
  const classes = useStyles();

  React.useEffect(() => {
    xhr
      .getAllDishes()
      .then((d) => setFoodData(d.data))
      .catch((err) => {
        console.log(err.message);
        setFoodData(false);
      });
  }, []);

  React.useEffect(() => {
    if (foodData instanceof Array) {
      const data = filterData(foodData, filters);
      console.log(data);
      setFilteredFoodData(data);
    }
  }, [foodData, filters]);

  return (
    <>
      {!showCreateWindow && (
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          onClick={() => setShowCreateWindow(true)}
        >
          <AddIcon />
        </Fab>
      )}

      <GlobalDishDataContext.Provider
        value={{
          foodData,
          refreshData() {
            console.log("refreshing");
            setFoodData(false); // this should not be filtered
            xhr.getAllDishes().then((d) => setFoodData(d.data));
          },
        }}
      >
        {filteredFoodData && filteredFoodData.length > 0 ? (
          <Carousel>
            {filteredFoodData.map((f, i) => (
              <FoodCard {...f} key={i} isCarousel={true} />
            ))}
          </Carousel>
        ) : (
          <Loader />
        )}

        {showCreateWindow && (
          <AddNewDish visiblityHandler={setShowCreateWindow} />
        )}

        <Container size="sm" style={{ padding: "2rem 0" }}>
          <Grid
            container
            spacing={2}
            style={{ margin: "auto" }}
            alignItems="flex-start"
          >
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              style={{
                borderRight: window.innerWidth > 960 ? "1px solid #efefef" : "",
              }}
            >
              <StyledTitle>Filters</StyledTitle>
              {/*Filters*/}
              <form
                autoComplete="no"
                ref={formFormat__ref}
                onChange={() => {
                  const formData = new FormData(formFormat__ref.current);
                  const data = [];

                  for (let f of formData) {
                    data.push(f[0]); // f[0] is the key. f[1] is empty as it is a checkbox
                  }

                  setFilters({ ...filters, format: data });
                }}
              >
                <AccordionWrapper title="Format">
                  {foodData instanceof Array ? ( // should NOT be filtered. or some of them would disappear
                    getUniqueValue(foodData, "format").map((f, i) => (
                      <CheckboxWrapper
                        name="format"
                        value={f ? f.toLowerCase() : ""}
                        label={f}
                        key={i}
                      />
                    ))
                  ) : (
                    <Loader />
                  )}
                </AccordionWrapper>
              </form>

              {/* Slider */}
              <AccordionWrapper title="Price ₹500 - ₹2000">
                <Slider
                  onChangeCommitted={(e) => console.log(e)}
                  value={filters.price}
                  onChange={(e, newValue) => {
                    setFilters({ ...filters, price: newValue });
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={100}
                  max={2000}
                  getAriaValueText={(valuetext) => valuetext}
                  marks={[
                    { value: 100, label: "₹100" },
                    { value: 2000, label: "₹2000" },
                  ]}
                />
              </AccordionWrapper>

              {/*Filters*/}
              <form
                ref={formOccasion__ref}
                autoComplete="no"
                onChange={() => {
                  const formData = new FormData(formOccasion__ref.current);
                  const data = [];

                  for (let f of formData) {
                    data.push(f[0]); // f[0] is the key. f[1] is empty as it is a checkbox
                  }

                  setFilters({ ...filters, occasion: data });
                }}
              >
                <AccordionWrapper title="Occasion">
                  {foodData instanceof Array ? ( // should NOT be filtered arr. or some items would be missing
                    getUniqueValue(foodData, "occasion").map((o, i) => (
                      <CheckboxWrapper
                        name="occasion"
                        value={o ? o.toLowerCase() : ""}
                        key={i}
                        label={o}
                      />
                    ))
                  ) : (
                    <Loader />
                  )}
                </AccordionWrapper>
              </form>
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              lg={9}
              container
              spacing={2}
              justify="center"
            >
              <StyledTitle
                style={{
                  flexGrow: 1,
                  minWidth: "100%",
                  paddingTop: "0.5rem",
                  paddingLeft: "4rem",
                }}
              >
                Results
              </StyledTitle>
              {filteredFoodData && filteredFoodData.length > 0 ? (
                filteredFoodData.map((f, i) => (
                  <Grid item key={i}>
                    <FoodCard {...f} />
                  </Grid>
                ))
              ) : (
                <Loader />
              )}
            </Grid>
          </Grid>
        </Container>
      </GlobalDishDataContext.Provider>
    </>
  );
}

export default Index;
