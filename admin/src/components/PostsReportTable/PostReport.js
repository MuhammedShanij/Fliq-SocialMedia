import React,{useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {UilInfoCircle} from '@iconscout/react-unicons'
import ReportedPostModal from "../ReportedPostModal/ReportedPostModal.js";
import Swal from 'sweetalert2';
import * as PostsApi from "../../api/PostsRequests";

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
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [reportedPostInfoOpen,setReportedPostInfoOpened]=useState(false)
  const [status,setStatus]=useState(data.post.status);

    const createdAt = new Date(data.createdAt);
    const date = createdAt.getDate();
    const month = createdAt.getMonth() + 1; // Months are zero-based, so add 1
    const year = createdAt.getFullYear();
    console.log(data,"reports")
    
    const formattedDate = `${date}/${month}/${year}`;
    const handleClick=()=>{
      setReportedPostInfoOpened(true)
    }
    const handleButtonClick=()=>{
      Swal.fire({
        title: 'Do you want to proceed?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async(result) => {
        if (result.isConfirmed) {
          // User clicked "Yes"
         const res= await PostsApi.blockPost(data.post._id,{status:status});
         setStatus(!status)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User clicked "No" or closed the dialog
          console.log('User clicked "No"');
        }
      });
    }
  return (
    <TableRow
      key={data._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
       {index}.
      </TableCell>
      <TableCell align="left"><b>{data.user.username}</b></TableCell>
      
      <TableCell align="left"><img
            src={
              data.post.image
                ?  data.post.image
                : publicFolder + "defaultProfilee.png"
            }
            alt="post"
            className="postImage"
          /></TableCell>
      <TableCell align="left">{data.post.desc}</TableCell>
      <TableCell align="center" >
        <div onClick={handleClick}>
        {<UilInfoCircle fill="gray"/>}
        </div>
        {data.reports.length}
        <ReportedPostModal 
      reportModalOpened={reportedPostInfoOpen}
      setReportModalOpened={setReportedPostInfoOpened}
      data={data.reports} />
        </TableCell>
      
      <TableCell align="left">
        <span className="status" 
        style={makeStyle(!status)}
        onClick={handleButtonClick}>
        {!status ? "Reported" : "Active"}
        </span>
      </TableCell>
      
    </TableRow>
  );
};

export default Post;
