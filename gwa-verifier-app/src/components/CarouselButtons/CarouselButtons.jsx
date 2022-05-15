import React from "react";
import PropTypes from "prop-types";
import { Stack, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function CarouselButtons({
  currPage,
  maxPage,
  saving,
  prevPage = () => {},
  nextPage = () => {},
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton disabled={currPage === 0 && !saving} onClick={prevPage}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography>
        {currPage + 1} out of {maxPage}
      </Typography>
      <IconButton
        disabled={currPage === maxPage - 1 && !saving}
        onClick={nextPage}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Stack>
  );
}

CarouselButtons.propTypes = {
  currPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default CarouselButtons;
