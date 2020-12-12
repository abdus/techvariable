import styled from "styled-components";
import { Grid, IconButton } from "@material-ui/core";

const CarouselController__left = styled(Grid)`
  position: absolute;
  z-index: 1000;
  top: 35%;
  left: -30px;
  border-radius: 50%;

  @media (max-width: 1310px) {
    & {
      left: -15px;
    }
  }
`;

const CarouselController__right = styled(CarouselController__left)`
  right: -30px;
  left: auto;

  @media (max-width: 1310px) {
    & {
      right: -15px;
    }
  }
`;

const CarouselControllerButton = styled(IconButton)`
  background-color: #fff;
  box-shadow: 0 1.4px 2.1px rgba(0, 0, 0, 0.16),
    0 3px 4.8px rgba(0, 0, 0, 0.124), 0 5.2px 8.1px rgba(0, 0, 0, 0.108),
    0 8px 12.5px rgba(0, 0, 0, 0.095), 0 11.9px 18.5px rgba(0, 0, 0, 0.085),
    0 17.4px 27.3px rgba(0, 0, 0, 0.075), 0 26.1px 40.8px rgba(0, 0, 0, 0.065),
    0 41.6px 65.1px rgba(0, 0, 0, 0.052), 0 78px 122px rgba(0, 0, 0, 0.036);

  &:hover {
    background-color: #fff;
  }
`;

export {
  CarouselControllerButton,
  CarouselController__left,
  CarouselController__right,
};
