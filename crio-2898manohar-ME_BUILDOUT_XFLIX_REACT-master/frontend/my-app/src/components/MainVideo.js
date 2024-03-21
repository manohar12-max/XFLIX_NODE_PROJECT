

import React from "react";
import Box from "@mui/material/Box";
import { useHistory, Link ,useParams} from "react-router-dom";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './MainVideo.css';
function MainVideo({video,likeState,setLikeState,vote,setVote}) {
   
  const onLikeclick = () => {
    if (likeState == "none") {
      setLikeState("like");
      setVote("increase");
    } else if (likeState == "dislike") {
      setLikeState("like");
      setVote("increase");
    } else {
      setLikeState("none");
      setVote("decrease");
    }
  };
  const onDisLikeclick = () => {
    if (likeState == "none") {
      setLikeState("dislike");
      setVote("increase");
    } else if (likeState == "like") {
      setLikeState("dislike");
      setVote("increase");
    } else {
      setLikeState("none");
      setVote("decrease");
    }
  };



  return (
   <>
    
          <Box className="Main-vid">
            <iframe
              className="main-video"
              src={`https://${video.videoLink}`}
              frameBorder="0"
            />
            <Box className="details">
              <h3>{video.title}</h3>
              <span>
                {video.contentRating} . {video.releaseDate}
              </span>
              <div className="vote-box">
                <Button
                  variant="outlined"
                  onClick={() => {
                    onLikeclick();
                  }}
                  startIcon={<ThumbUpAltIcon color="primary" size="small" />}
                  className={likeState=="like" ? ("like-selected"):("not-selected")}
                >
                  {video.votes.upVotes}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onDisLikeclick();
                  }}
                  startIcon={<ThumbDownAltIcon color="primary" size="small" />}
                  className={likeState==="dislike" ? ("like-selected"):("not-selected")}
                >
                  {video.votes.downVotes}
                </Button>
              </div>
            </Box>
          </Box>
   </>
  );
}

export default MainVideo;
