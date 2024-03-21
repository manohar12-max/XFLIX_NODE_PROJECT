import React ,{Children} from "react";
import { Search } from "@mui/icons-material";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory, Link ,useNavigate} from "react-router-dom";
import  { useEffect, useState } from "react";
import "./Header.css";

function Header({children,hide,onUploadClick} ) {
   const navigate=useNavigate();
  if(hide){
    return (
      <Box className="header">
        <Box className="header-title"  onClick={()=>{navigate("/")}}>
          <strong className="x">X </strong>
          <strong className="flix">Flix</strong>
        </Box>
        </Box>
        ) 
  }

  return (
    <Box className="header">
      <Box className="header-title" onClick={()=>{navigate("/")}}>
        <strong className="x">X </strong>
        <strong className="flix">Flix</strong>
      </Box>
      {children}
      <Box>
        <Button className="upload" variant="contained" size="small" onClick={()=>{onUploadClick()}}>
          Upload
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
