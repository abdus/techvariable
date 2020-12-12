import React from "react";
import propTypes from "prop-types";
import { Typography, Grid, Container } from "@material-ui/core";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import {
  CarouselControllerButton,
  CarouselController__left,
  CarouselController__right,
} from "./styled";

const Carousel = (props) => {
  const [currentCarouselPos, setCarouselPos] = React.useState(0);
  const carouselViewAreaRef = React.useRef();

  return (
    <div
      style={{
        backgroundColor: "#fdf4f1",
        padding: "2rem 0",
      }}
    >
      <Container maxWidth="lg">
        <Typography component="strong" color="textPrimary">
          MOST FREQUENTLY ORDERED FOOD
        </Typography>
        <Grid
          container
          spacing={2}
          wrap="nowrap"
          style={{ position: "relative" }}
          ref={carouselViewAreaRef}
        >
          <CarouselController__left item>
            <CarouselControllerButton
              color="primary"
              aria-label="go to left of carousel"
              onClick={() => {
                setCarouselPos(
                  currentCarouselPos <= 0 ? 0 : currentCarouselPos - 318
                );
              }}
            >
              <KeyboardArrowLeftRoundedIcon />
            </CarouselControllerButton>
          </CarouselController__left>
          <Grid item style={{ overflow: "hidden" }}>
            <Grid
              item
              container
              spacing={2}
              wrap="nowrap"
              style={{
                transform: `translateX(-${currentCarouselPos}px)`,
                transition: "0.3s cubic-bezier(0.22, 0.61, 0, 0.94) transform",
              }}
            >
              {props.children &&
                props.children.length > 0 &&
                props.children.map((x, i) => (
                  <Grid item key={i}>
                    {x}
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <CarouselController__right item>
            <CarouselControllerButton
              color="primary"
              aria-label="go to right of carousel"
              onClick={() => {
                setCarouselPos(currentCarouselPos + 318);
              }}
            >
              <KeyboardArrowRightRoundedIcon />
            </CarouselControllerButton>
          </CarouselController__right>
        </Grid>
      </Container>
    </div>
  );
};

Carousel.propTypes = {
  children: propTypes.node,
};

export default Carousel;
