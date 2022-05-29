import React, { useEffect } from "react";
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
    const [statusColor, setStatusColor] = React.useState(null);

    useEffect(() => {
      let color = "";

      if(student.status === "SATISFACTORY") {
        color = "#3E9647"; // green
      }else if(student.status === "UNSATISFACTORY") {
        color = "#26ABFF"; // blue
      }else if(student.status === "UNCHECKED") {
        color = "#A6826F"; // brown
      }else if(student.status === "PENDING") {
        color = "#FFB81C"; // gold
      }else if(student.status === "INCOMPLETE") {
        color = "#C7C7C7"; // grey
      }

      setStatusColor(color);
    }, [])

    return(
		<Typography variant="contained" display="flex" justifyContent="center" alignItems="center" style={{ backgroundColor: statusColor, width: 150, height: 38, borderRadius: 8, fontWeight: 600 }} >{student.status}</Typography>
    )

  }
}

export default StudentStatus;