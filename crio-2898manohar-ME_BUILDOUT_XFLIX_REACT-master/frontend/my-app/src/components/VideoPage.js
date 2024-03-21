import React from "react";
import Box from "@mui/material/Box";
import { useHistory, Link, useParams, useSearchParams ,useNavigate,useLocation} from "react-router-dom";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import Header from "./Header";
import VideoCard from "./VideoCard";
import MainVideo from "./MainVideo";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {config} from "../App"
import "./VideoPage.css";

let temp = "";
const VideoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [likeState, setLikeState] = useState("none");
  const [vote, setVote] = useState("");
  const navigate=useNavigate()
  const location=useLocation()

  const main=location.state
if(!main){
  setIsLoading(true)
}
const {video,allVideos}=main

  // const onLikeclick = () => {
  //   if (likeState == "none") {
  //     setLikeState("like");
  //     setVote("increase");
  //   } else if (likeState == "dislike") {
  //     setLikeState("like");
  //     setVote("increase");
  //   } else {
  //     setLikeState("none");
  //     setVote("decrease");
  //   }
  // };
  // const onDisLikeclick = () => {
  //   if (likeState == "none") {
  //     setLikeState("dislike");
  //     setVote("increase");
  //   } else if (likeState == "like") {
  //     setLikeState("dislike");
  //     setVote("increase");
  //   } else {
  //     setLikeState("none");
  //     setVote("decrease");
  //   }
  // };



  useEffect(() => {
    if (!vote) {
      return;
    }
    const update = async (vote, declare) => {
      console.log(vote, declare);
      const response = await axios({
        url: `${config.endpoint}/${video._id}/votes`,
        method: "patch",
        data: {
          vote: `${vote}`,
          change: `${declare}`,
        },
      });
      //setMain(response.data)
    };
  
    if (likeState === "like" ) {
      update(vote, "upVote");
      temp = likeState;
    } else if (temp == "like" && likeState == "none") {
      update(vote, "upVote");
    
    }else if(temp == "like" && likeState == "dislike"){
      update("decrease","upVote")
    }
  
    if (likeState == "dislike") {
      update(vote, "downVote");
      temp = likeState;
    } else if (temp == "dislike" && likeState == "none") {
      update(vote, "downVote");
    }
    return
  }, [vote, likeState]);

 

  return (
    <>
      

      <Header hide={true} />
      <div className="Hero">
        {/* {!isLoading ? (
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
        ) : (
          <Box>
            {" "}
            <CircularProgress color="inherit" />
            <h5>Loading videos...</h5>
          </Box>
        )} */}

        {!isLoading ? ( <MainVideo video={video} likeState={likeState} setLikeState={setLikeState} vote={vote} setVote={setVote}/>): (   <Box className="loading">
   {" "}
   <CircularProgress color="inherit"/>
   <h5>Loading videos...</h5>
 </Box>)
   }

        <Grid className="container">
    {isLoading ? (<Box className="loading">
   {" "}
   <CircularProgress color="inherit"/>
   <h5>Loading videos...</h5>
 </Box>):(
   <Grid
   className="Video-Grid"
   container
   spacing={1}
   justifyContent="center"
   alignItems="center"
   columnSpacing={{ xs: 1, md: 3 }}
   marginY="1rem"
 >
  {allVideos.length>0 ? (
    allVideos.map((vid)=>(
      <Grid item xs={6} md={3} key={vid._id}>
      <VideoCard video={vid} allVideos={allVideos} />
    </Grid>
    ))
  ):(null)}
 </Grid>
 )}
  </Grid>
      </div>
    </>
  );
};

export default VideoPage;
