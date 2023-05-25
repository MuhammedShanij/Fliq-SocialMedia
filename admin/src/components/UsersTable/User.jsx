import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import { blockUser } from "../../api/UserRequests";
import '../Table/Table.css'
const makeStyle=(status)=>{
    if(status)
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

const User = ({person,index}) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [blockStatus,setBlockStatus]=useState(person.isBlocked)

  const handleBlock=()=>{
    const data={
      _id:person._id,
      isBlocked:blockStatus,
    }
    blockUser(data)
    setBlockStatus((prev)=>!prev);
  }
  const createdAt = new Date(person.createdAt);
const date = createdAt.getDate();
const month = createdAt.getMonth() + 1; // Months are zero-based, so add 1
const year = createdAt.getFullYear();

const formattedDate = `${date}/${month}/${year}`;


  return (
    <TableRow
      key={person._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index}.
      </TableCell> 
      <TableCell align="left" >
      <img
            src={
              person.profilePicture
                ? publicFolder + person.profilePicture
                : publicFolder + "defaultProfilee.png"
            }
            alt="profile"
            className="postImage"
          />
      </TableCell>
      <TableCell align="left">{person.username}</TableCell>
      <TableCell align="left">{person.firstname}</TableCell>
      <TableCell align="left">{person.lastname}</TableCell>
      <TableCell align="left">{formattedDate}</TableCell>
      <TableCell align="left">
        <span
          className="status"
          onClick={handleBlock}
          style={{ ...makeStyle(blockStatus), cursor: "pointer" }}
          
        >
          {blockStatus ? "Unblock User" : "Block User"}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default User;
