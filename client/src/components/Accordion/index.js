import React from "react";
import propTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const AccordionWrapper = (props) => {
  return (
    <>
      <Accordion
        defaultExpanded={props.defaultExpanded || true}
        style={{
          boxShadow: "none",
          borderBottom: "1px solid #efefef",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography color="textPrimary">
            <strong>{props.title}</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          {props.children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

AccordionWrapper.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node,
  defaultExpanded: propTypes.bool,
};

export default React.memo(AccordionWrapper);
