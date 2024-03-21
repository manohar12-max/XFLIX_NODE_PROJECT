import React from "react";
import Box from "@mui/material/Box";
import { useHistory, Link,useNavigate, createSearchParams } from "react-router-dom";
import  { useEffect, useState } from "react";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import {config} from "../App"
import axios from "axios"
import "./VideoCard.css";

const VideoCard=({video ,allVideos})=>{
  const {videolink ,title,releaseDate,previewImage}=video;

  const navigate=useNavigate()
const onCardClick=async()=>{
  try{
    await axios.patch(`${config.endpoint}/${video._id}/views`)
  }catch(err){
    console.log(err)
  }
  navigate(`/video/${video._id}`,{state:{video,allVideos}})
}
     return(
    
        <Box className="Video-container" onClick={onCardClick}>
         <Card sx={{ maxWidth: 276 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="153"
          image={previewImage}
          alt={title}
        />
        <div className="content">
         <p>{title}</p>
        </div>
      </CardActionArea>
    </Card>
            
        </Box>
  
     )
}

export default VideoCard;