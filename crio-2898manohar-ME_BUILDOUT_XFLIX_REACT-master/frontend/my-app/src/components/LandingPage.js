import React from "react";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Header from "./Header";
import VideoCard from "./VideoCard";
import Upload from "./Upload"
import "./LandingPage.css";
import {config} from "../App"
let ageFilter = ["Anyone", "7%2B", "12%2B", "16%2B", "18%2B"];
let genreFilter = ["All", "Education", "Sports", "Comedy", "Lifestyle"];




const LandingPage = () => {
  console.log(config)
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedAge, setSelectedAge] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [sort, setSort] = useState('');
  const [openPopup,setOpenPopup]=useState(false)


 
  const performApiCall = async () => {
    try {
      setIsLoading(false);
      const response = await axios.get(
        config.endpoint );
      setVideo(response.data.videos);
      return response.data.videos;
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  };
 
 
 
  useEffect(()=>{
  const load=async()=>{
  
    if(selectedGenre.length===0 && !selectedAge){
      return
    }
     let string=selectedGenre.join(",")
     if(search.length>0){
      try{
        if(!selectedAge || string && selectedAge=="Anyone"){
          setIsLoading(false);
          const response = await axios.get (`${config.endpoint}}?title=${search}&genres=${string}`);
          setVideo(response.data.videos);
          return
        }else if(selectedGenre.length===0 || selectedAge && string=='All'){
          setIsLoading(false);
          const response = await axios.get (`${config.endpoint}}?title=${search}&contentRating=${selectedAge}`);
          setVideo(response.data.videos);
          return
        }
      setIsLoading(false);
      const response = await axios.get (`${config.endpoint}}?title=${search}&genres=${string}&contentRating=${selectedAge}`);
      setVideo(response.data.videos);
      return 
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    } 
      
     }else {
      try {
        if(!selectedAge || string && selectedAge=="Anyone"){
        
          setIsLoading(false);
          const response = await axios.get (`${config.endpoint}}?&genres=${string}`);
          setVideo(response.data.videos);
          return
        }else if(selectedGenre.length===0  || selectedAge && string=='All'){
          setIsLoading(false);
          const response = await axios.get (`${config.endpoint}}?&contentRating=${selectedAge}`);
          setVideo(response.data.videos);
          return
        }
        setIsLoading(false);
        const response = await axios.get(`${config.endpoint}}?&genres=${string}&contentRating=${selectedAge}`);
        setVideo(response.data.videos);
        return 
      } catch (err) {
        setIsLoading(true);
        console.log(err);
      } 
    
  }
 
}
  load();
 },[selectedGenre,selectedAge])

 useEffect(()=>{
   if(!sort){
    return
   }
   const sortOnload=async(sort)=>{
    
      try{
        if(sort=="releaseDate") {
      const response = await axios.get(`${config.endpoint}}?sortBy=${sort}`);
        setVideo(response.data.videos)
        }else{
          const response = await axios.get(`${config.endpoint}}?sortBy=${sort}`);
          setVideo(response.data.videos)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    sortOnload(sort)

 },[sort])

const selectChange = (event) => {
  setSort(event.target.value);
};


  const onValueChange = (e) => {
    setSearch(e.target.value);
  };
  const searchOnClick = async (text) => {
  text=text.trim();
  if(text.length==0){
    return;
  }
  if(selectedAge!="Anyone" && selectedGenre !=["All"] ){
    let string=selectedGenre.join(",")
  
    try {
      setIsLoading(false);
      const response = await axios.get(`${config.endpoint}}?title=${text}&genres=${string}&contentRating=${selectedAge}`);
      setVideo(response.data.videos);
      return 
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  }else if(selectedAge!="Anyone" ){
    try {
      setIsLoading(false);
      const response = await axios.get(`${config.endpoint}}?title=${text}&contentRating=${selectedAge}`);
      setVideo(response.data.videos);
      return 
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  }else if(!selectedGenre.includes("All")){
    let string=selectedGenre.join(",")
    try {
    
      setIsLoading(false);
      const response = await axios.get(`${config.endpoint}}?title=${text}&genres=${string}`);
      setVideo(response.data.videos);
      return 
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  
  }else{
    try {
      setIsLoading(false);
      const response = await axios.get(`${config.endpoint}}?title=${text}`);
      setVideo(response.data.videos);
      return 
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  }
       
  };

  const onButtonClickAge =async (age) => {
    if (age === selectedAge) {
      setSelectedAge("Anyone");
    }else setSelectedAge(age);    
   
  };
  const onButtonClickGenre = async (genre) => {
    if (genre === "All") {
      setSelectedGenre(["All"]);
    } else {
      let array = [...selectedGenre];
      if (array.includes("All")) {
        array = [];
      }

      if (selectedGenre.includes(genre)) {
        array = selectedGenre.filter((e) => e !== genre);
        if (array.length === 0) {
          array = ["All"];
        }
        setSelectedGenre([...array]);
     
      }else setSelectedGenre([...array, genre]);
    }
    }
     
   



  useEffect(() => {
    const onLoad = async () => {
      await performApiCall();
    };
    onLoad();
  }, []);

  return (
    
    <>
      <Header hide ={false} onUploadClick={()=>{setOpenPopup(true)}}>
        <div className="search-div">
          <input
            type="text"
            className="input-search-box"
            placeholder="Search"
            onChange={onValueChange}
          />
          <div className="search-icon">
            <Button
              varient="contained"
              startIcon={<Search color="action" size="small" />}
              onClick={() => {
                searchOnClick(search);
              }}
            ></Button>
          </div>
        </div>
        
      </Header>
        <Box className="Filter-box">
          <Box className="genres-container">
            {genreFilter.map((genre,index) => (
              <Box
                className={ selectedGenre.includes(genre)   ?  ("selected" )  :( "notSelected") }
                onClick={() => {
                  onButtonClickGenre(genre);
                }}
              key={index}>
                {genre}
              </Box>
            ))}
           {/* <Box className= "selected" onClick={()=> sort== "releaseDate" ? setSort("viewCount") : setSort("releaseDate")}>
            {sort}
            </Box> */}
 <select name="sort" id="sort-select" onChange={(e)=>{selectChange(e)}}>
    <option value="">SotBy</option>
    <option value="releaseDate">Release Date</option>
    <option value="viewCount">View Count</option>
   
</select>

         </Box>
          <Box className="age-container">
            {ageFilter.map((age,index) => (
              <Box
                className={
                  age === selectedAge ? ("selected" )  :( "notSelected")
                }
                onClick={() => {
                  onButtonClickAge(age);
                }}
                key={index}
              >
                {age}
              </Box>
            ))}
          </Box>
        </Box>
    
      <Grid container>
        {isLoading ? (
          <Box className="loading">
            {" "}
            <CircularProgress color="inherit"/>
            <h5>Loading videos...</h5>
          </Box>
        ) : (
          <Grid
            className="video-grid"
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            columnSpacing={{ xs: 1, md: 3 }}
            marginY="1rem"
          >
            {video.length
              ? video.map((vid) => (
                  <Grid item xs={6} md={3} key={vid._id}  >
                    <VideoCard video={vid} allVideos={video} />
                  </Grid>
                ))
              : null}
          </Grid>
        )}
      </Grid>
      <Upload openPopup={openPopup} setOpenPopup={setOpenPopup}/>
     
    </>
  );
};

export default LandingPage;
