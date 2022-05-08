import React from "react";
import { Box , CircularProgress, Typography } from '@mui/material'

function CommitteeComments({comments}){
  if(comments == null){
    return(
      <Box sx={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
            <CircularProgress sx={{ margin:"auto"}}/>
      </Box>
    )
  }
  else{
      return(
        <>
        {comments.map(comment =>
          <Box sx={{ m: 3.5, flexGrow: 1 }}>
            <div>
              <Typography style={{ fontWeight: 1000}} component="div" sx={{ flex: 1 }}>
                {comment.committee_email}
              </Typography>
              <Typography component="div" sx={{ flex: 1 }}>
                {comment.comments}
              </Typography>
            </div>
          </Box>
        )}
        </>
      )
    }
  }

  export default CommitteeComments;