import React from "react";
import {
 Typography,
 CircularProgress,
 Box
} from "@mui/material";

function StudentStatus({student}) {
	 if(student == null){
    return(
      <Box sx={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
            <CircularProgress sx={{ margin:"auto"}}/>
      </Box>
    )
  } else {
    return(
		<Typography variant="contained" display="flex" justifyContent="center" alignItems="center" style={{ backgroundColor:'#C7C7C7', width: 120, height: 38, borderRadius: 8 }} >{student.status}</Typography>
    )

  }
}

export default StudentStatus;