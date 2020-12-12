import React from "react";
import propTypes from "prop-types";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { FormControlLabel, Checkbox, Grid } from "@material-ui/core";

const CheckboxWrapper = (props) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.checked}
              onChange={props.onChangeHandler}
              name={props.label}
              color="primary"
              icon={<CheckBoxOutlineBlankIcon color="disabled" />}
            />
          }
          label={props.label}
          style={{ color: "gray" }}
        />
      </Grid>
    </Grid>
  );
};

CheckboxWrapper.propTypes = {
  checked: propTypes.bool.isRequired,
  onChangeHandler: propTypes.func.isRequired,
  label: propTypes.string,
};

export default CheckboxWrapper;
