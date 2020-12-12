import React from "react";
import propTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import styled from "styled-components";
import FoodMarker from "../FoodMarker/";
import Modal from "../Modal";

const FoodCard = (props) => {
  const [orderDish, setOrderDish] = React.useState(false);
  const StyledGrid = styled(Grid)`
    wrap: nowrap;
    align-items: center;
    flex-direction: row;
  `;

  const StyledButton__red = styled(Button)`
    color: red;
  `;

  const ActionAcceptComponent = () => <Typography>Order</Typography>;
  const ActionRejectComponent = () => <Typography>Cancel</Typography>;

  return (
    <>
      {/* open modal when user wants to edit a dish */}
      {orderDish && (
        <Modal
          open={true}
          title={`Order ${props.name}`}
          handler={setOrderDish}
          actionAcceptComponent={ActionAcceptComponent}
          actionRejectComponent={ActionRejectComponent}
        >
          <Typography>RS {props.price}</Typography>
          here, a form will be available(ofc once I create that) for users to
          order that specific meal
        </Modal>
      )}
      <Card
        style={{
          maxWidth: 300,
          width: 300,
          boxShadow: "none",
          border: "1px solid lightgray",
        }}
      >
        <CardMedia
          component="img"
          image={`https://picsum.photos/200/120?${Math.random()}`}
          title="Tasty Food"
          style={{ minHeight: 180 }}
        />
        <CardContent>
          <StyledGrid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="h6" component="h2" noWrap>
                {props.name}
              </Typography>
              <Typography color="textSecondary" noWrap={true}>
                {props.location}
              </Typography>
            </Grid>
            {props.isCarousel && (
              <Grid item>
                <StyledButton__red
                  size="small"
                  onClick={() => setOrderDish(true)}
                >
                  re-order
                </StyledButton__red>
              </Grid>
            )}
          </StyledGrid>
        </CardContent>
        {!props.isCarousel && <FoodCardFooter {...props} />}
      </Card>
    </>
  );
};

const FoodCardFooter = ({ type, price }) => {
  const StyledFooterLabel = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <>
      <CardContent style={{ paddingTop: 0 }}>
        <Typography color="textSecondary">
          <strong style={{ color: "red" }}>₹{price}</strong> Per Head &middot;
          10 Dishes
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <Grid item container alignItems="center">
            <StyledFooterLabel color="primary" variant="contained" size="small">
              <StarIcon color="" fontSize="small" />
              &nbsp; 3.1
            </StyledFooterLabel>
            <Typography
              component="small"
              color="textSecondary"
              variant="caption"
            >
              &nbsp;&nbsp;213 Ratings
            </Typography>
          </Grid>
          <Grid item>
            <Grid item container direction="row" wrap="nowrap">
              {type &&
                type.length > 0 &&
                type.map((t, i) => <FoodMarker key={i} type={t} />)}
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
};

FoodCard.propTypes = {
  isCarousel: propTypes.bool,
};

export default React.memo(FoodCard);
