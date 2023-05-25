import React,{useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {UilInfoCircle} from '@iconscout/react-unicons'
import ReportedPostModal from "../ReportedPostModal/ReportedPostModal.js";

const makeStyle=(status)=>{
  if(!status)
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else{
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
}


const Post = ({data,index}) => {
  const [reportedPostInfoOpen,setReportedPostInfoOpened]=useState(false)
    const createdAt = new Date(data.createdAt);
    const date = createdAt.getDate();
    const month = createdAt.getMonth() + 1; // Months are zero-based, so add 1
    const year = createdAt.getFullYear();
    
    const formattedDate = `${date}/${month}/${year}`;
    const handleClick=()=>{
      setReportedPostInfoOpened(true)
    }

  return (
    <TableRow
      key={data._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
       {index}.
      </TableCell>
      <TableCell align="left"><b>{data.userInfo.username}</b></TableCell>
      
      <TableCell align="left">{formattedDate}</TableCell>
      <TableCell align="left">{data.reason}</TableCell>
      <TableCell align="center" >
        <div onClick={handleClick}>
        {<UilInfoCircle fill="gray"/>}
        </div>

        <ReportedPostModal 
      reportModalOpened={reportedPostInfoOpen}
      setReportModalOpened={setReportedPostInfoOpened}
      data={data.postInfo}/>
        </TableCell>
      
      <TableCell align="left">
        <span className="status" 
        style={makeStyle(data.isReported)}
        >
        {data.isReported ? "Reported" : "Active"}
        </span>
      </TableCell>
      
    </TableRow>
  );
};

export default Post;
