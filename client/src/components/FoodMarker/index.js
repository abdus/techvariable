import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Box = styled.div`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  border: 1px solid
    ${({ type }) =>
    type === "egg"
      ? "yellow"
      : type === "veg"
        ? "lawngreen"
        : type === "chicken"
          ? "red"
          : "gray"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(Box)`
  width: 7px;
  height: 7px;
  margin-left: 0px;
  border-radius: 50%;
  background-color: ${({ type }) =>
    type === "egg"
      ? "yellow"
      : type === "veg"
        ? "lawngreen"
        : type === "chicken"
          ? "red"
          : "gray"};
`;

const FoodMarker = ({ type }) => {
  return (
    <Box title={type} type={type}>
      <Circle type={type} />
    </Box>
  );
};

FoodMarker.propTypes = {
  type: propTypes.oneOf(["egg", "veg", "chicken"]),
};

export default FoodMarker;
