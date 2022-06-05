import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/*
  Component: CommitteeComments
  Description:
    A component that renders an individual comment of a committee member.
    It also renders a circluar progress icon when the comments are still 
    being fetched.
*/

function CommitteeComments({ comments }) {
  if (comments == null) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <CircularProgress sx={{ margin: "auto" }} />
      </Box>
    );
  } else {
    return (
      <>
        {comments.map((comment, idx) => (
          <Box key={idx} sx={{ m: 3.5, flexGrow: 1 }}>
            <div>
              <Typography
                style={{ fontWeight: 1000 }}
                component="div"
                sx={{ flex: 1 }}
              >
                {comment.committee_email}
              </Typography>
              <Typography component="div" sx={{ flex: 1 }}>
                {comment.comments}
              </Typography>
            </div>
          </Box>
        ))}
      </>
    );
  }
}

export default CommitteeComments;
